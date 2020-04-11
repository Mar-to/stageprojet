<?php

namespace App\Controller;

use App\Application\Sonata\UserBundle\Form\Type\RegistrationFormType;
use App\Command\GoGoMainCommand;
use App\DataFixtures\MongoDB\LoadConfiguration;
use App\Document\Category;
use App\Document\Configuration;
use App\Document\Option;
use App\Document\Project;
use App\Document\ScheduledCommand;
use App\Document\Taxonomy;
use App\Helper\SaasHelper;
use Doctrine\ODM\MongoDB\DocumentManager;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Security\LoginManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Process\Process;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends Controller
{
    protected function isAuthorized()
    {
        $sassHelper = new SaasHelper();

        return $sassHelper->isRootProject();
    }

    protected function generateUrlForProject($project, $route = 'gogo_homepage', $params = [])
    {
        return 'http://'.$project->getDomainName().'.'.$this->getParameter('base_url').$this->generateUrl($route, $params);
    }

    public function createAction(Request $request, DocumentManager $dm)
    {
        if (!$this->isAuthorized()) {
            return $this->redirectToRoute('gogo_homepage');
        }

        $project = new Project();

        $projectForm = $this->createFormBuilder($project)
            ->add('name', null, ['required' => true])
            ->add('domainName', null, ['required' => true])
            ->getForm();

        $projectForm->handleRequest($request);
        if ($projectForm->isSubmitted() && $projectForm->isValid()) {
            $dm->persist($project);
            $dm->flush();
            // initialize commands
            $commands = GoGoMainCommand::SCHEDULED_COMMANDS;

            foreach ($commands as $commandName => $period) {
                $scheduledCommand = new ScheduledCommand();
                $scheduledCommand->setProject($project);
                $scheduledCommand->setNextExecutionAt(time());
                $scheduledCommand->setCommandName($commandName);
                $project->addCommand($scheduledCommand);
                $dm->persist($scheduledCommand);
            }
            $dm->flush();

            $params = [
                'appName' => $project->getName(),
                'dbName' => $project->getDbName(),
                'contrib' => $request->request->get('contrib')
            ];
            $url = $this->generateUrlForProject($project, 'gogo_saas_initialize_project', $params);

            return $this->redirect($url);
        }

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        return $this->render('saas/projects/create.html.twig', ['form' => $projectForm->createView(), 'config' => $config]);
    }

    /**
     * @Route("/projects", name="gogo_saas_home")
     */
    public function homeAction(DocumentManager $dm)
    {
        if (!$this->isAuthorized()) {
            return $this->redirectToRoute('gogo_homepage');
        }

        $repository = $dm->getRepository('App\Document\Project');

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        $projects = $repository->findBy([], ['dataSize' => 'DESC']);

        foreach ($projects as $project) {
            $project->setHomeUrl($this->generateUrlForProject($project));
        }

        return $this->render('saas/home.html.twig', ['projects' => $projects, 'config' => $config]);
    }

    public function initializeAction(Request $request, DocumentManager $dm, UserManagerInterface $userManager,
                                     LoginManagerInterface $loginManager)
    {
        $users = $dm->getRepository('App\Document\User')->findAll();
        if (count($users) > 0) {
            return $this->redirectToRoute('gogo_homepage');
        }

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        if (!$config) {
            // INITALIZE CONFIGURATION

            // Clone the root configuration into the new project
            // Due to conflicts between ODM, we get the Configuration from a Json API, and convert it to an object
            $baseUrl = $this->getParameter('base_url');
            // Fixs for docker in localhost: cannot make API call working, so using gogocarto.fr conf !!
            if ('saas.localhost' == $baseUrl) {
                $baseUrl = 'gogocarto.fr';
            }

            $configUrl = 'http://'.$baseUrl.$this->generateUrl('gogo_api_configuration');
            $configUrl = str_replace('index.php/', '', $configUrl); // Fix for localhost
            $rootConfigToCopy = json_decode(file_get_contents($configUrl));
            $rootConfigToCopy->appName = $request->query->get('appName');
            $rootConfigToCopy->appBaseLine = '';
            $rootConfigToCopy->dbName = $request->query->get('dbName');
            // Duplicate configuration
            $confLoader = new LoadConfiguration();
            $config = $confLoader->load($dm, $this->container, $rootConfigToCopy, $request->query->get('contrib'));

            // Generate basic categories
            $mainCategory = new Category();
            $mainCategory->setName('Catégories Principales');
            $mainCategory->setPickingOptionText('Une catégorie principale');
            $dm->persist($mainCategory);

            $mains = [
                ['Catégorie 1', 'fa fa-recycle', '#98a100'],
                ['Catégorie 2', 'fa fa-home', '#7e3200'],
            ];

            foreach ($mains as $key => $main) {
                $new_main = new Option();
                $new_main->setName($main[0]);
                $new_main->setIcon($main[1]);
                $new_main->setColor($main[2]);
                $new_main->setIsFixture(true);
                $mainCategory->addOption($new_main);
            }

            $dm->flush(); // flush before taxonomy creating otherwise strange bug creating option with only DBRef

            $taxonomy = new Taxonomy();
            $dm->persist($taxonomy);
            $dm->flush();

            $dm->getSchemaManager()->updateIndexes();
        }

        // CRATE ADMIN USER
        $user = $userManager->createUser();

        $form = $this->get('form.factory')->create(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();
            $user->setEnabled(true);
            $user->setRoles(['ROLE_SUPER_ADMIN']);
            $userManager->updateUser($user, true);

            $this->addFlash('success', "<b>Bienvenue dans votre espace Administrateur !</b></br>
                L'aventure commence tout juste pour vous, il vous faut maintenant commencer à configurer votre site :)</br>
                <a target='_blank' href='https://doc.gogocarto.fr/'>Consulter la documentation</a> pour vous aider à démarrer ! Tutoriels vidéos, foire aux questions...");
            $response = $this->redirectToRoute('sonata_admin_dashboard');

            $this->authenticateUser($user, $response, $loginManager);

            return $response;
        }

        return $this->render('saas/projects/initialize.html.twig', ['form' => $form->createView(), 'config' => $config]);
    }

    protected function authenticateUser(UserInterface $user, Response $response,
                                        LoginManagerInterface $loginManager)
    {
        try {
            $loginManager->loginUser(
                $this->getParameter('fos_user.firewall_name'),
                $user,
                $response
            );
        } catch (AccountStatusException $ex) {
        }
    }

    // The project is being deleted by the owner
    public function deleteCurrProjectAction()
    {
        $saasHelper = new SaasHelper();
        $dbname = $saasHelper->getCurrentProjectCode();
        $commandline = 'mongo '.$dbname.' --eval "db.dropDatabase()"';
        $process = new Process($commandline);
        $process->start();
        $url = $this->generateUrl('gogo_project_delete_saas_record', ['dbName' => $dbname], true);
        $url = str_replace($dbname.'.', '', $url);

        return $this->redirect($url);
    }

    public function deleteSaasRecordAction($dbName, DocumentManager $dm)
    {
        $command = "mongo --eval 'db.getMongo().getDBNames().indexOf(\"{$dbName}\")'";
        $process = new Process($command);
        $process->run();
        $isDbEmpty = "-1\n" == substr($process->getOutput(), -3);
        // As it is a public API, only allow delete if the db is empty
        if ($isDbEmpty) {
            $project = $dm->getRepository(Project::class)->findOneByDomainName($dbName);
            $dm->remove($project);
            $dm->flush();
        }

        return $this->redirectToRoute('gogo_homepage');
    }
}
