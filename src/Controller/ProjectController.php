<?php

namespace App\Controller;

use App\Application\Sonata\UserBundle\Form\Type\RegistrationFormType;
use App\Command\GoGoMainCommand;
use App\DataFixtures\MongoDB\LoadConfiguration;
use App\Document\Category;
use App\Document\Option;
use App\Document\Project;
use App\Document\ScheduledCommand;
use App\Document\Taxonomy;
use App\Services\DocumentManagerFactory;
use Doctrine\ODM\MongoDB\DocumentManager;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Security\LoginManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends Controller
{
    protected function generateUrlForProject($project, $route = 'gogo_homepage', $params = [])
    {
        $url = 'http://'.$project->getDomainName().'.'.$this->getParameter('base_url').$this->generateUrl($route, $params);
        return str_replace('index.php/index.php', 'index.php', $url); // Fix if there is no url rewrite
    }

    public function createAction(Request $request, DocumentManagerFactory $dmFactory)
    {
        if (!$dmFactory->isRootProject()) {
            return $this->redirectToRoute('gogo_homepage');
        }

        $dm = $dmFactory->getRootManager();
        $project = new Project();

        $projectForm = $this->createFormBuilder($project)
            ->add('name', null, ['required' => true])
            ->add('domainName', null, ['required' => true])
            ->getForm();

        $projectForm->handleRequest($request);
        if ($projectForm->isSubmitted() && $projectForm->isValid()) {

            // save project
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

            // initialize new database
            $projectDm = $dmFactory->createForDB($project->getDomainName());
            $rootDm = $dm;

            // INITALIZE CONFIGURATION (copy root project conf)
            $rootConf = $rootDm->getRepository('App\Document\Configuration')->findConfiguration();
            $projectConf = clone $rootConf;
            $projectConf->setAppName($project->getName());
            $projectConf->setAppBaseLine('');
            $projectConf->setDbName($project->getDomainName());

            $tileLayers = $rootDm->getRepository('App\Document\TileLayer')->findAll();
            foreach ($tileLayers as $tileLayer) {
                $newTileLayer = clone $tileLayer;
                $projectDm->persist($newTileLayer);
                if ($tileLayer === $rootConf->getDefaultTileLayer()) {
                    $projectConf->setDefaultTileLayer($newTileLayer);
                }
            }

            $confLoader = new LoadConfiguration();
            $confLoader->initContributionConfig($projectConf, $request->request->get('contrib'));

            $projectDm->persist($projectConf);

            // Generate basic categories
            $mainCategory = new Category();
            $mainCategory->setName('Catégories Principales');
            $mainCategory->setPickingOptionText('Une catégorie principale');
            $projectDm->persist($mainCategory);

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

            $projectDm->flush(); // flush before taxonomy creating otherwise strange bug creating option with only DBRef

            $taxonomy = new Taxonomy();
            $projectDm->persist($taxonomy);
            $projectDm->flush();

            $projectDm->getSchemaManager()->updateIndexes();


            // REDIRECT to new project
            $url = $this->generateUrlForProject($project, 'gogo_saas_initialize_project');
            return $this->redirect($url);
        }

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        return $this->render('saas/projects/create.html.twig', ['form' => $projectForm->createView(), 'config' => $config]);
    }

    /**
     * @Route("/projects", name="gogo_saas_home")
     */
    public function homeAction(DocumentManagerFactory $dmFactory)
    {
        if (!$dmFactory->isRootProject()) {
            return $this->redirectToRoute('gogo_homepage');
        }
        $dm = $dmFactory->getCurrentManager();
        $repository = $dm->getRepository('App\Document\Project');

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

        $projects = $dm->createQueryBuilder('App\Document\Project')
                        ->field('published')->equals(true)
                        ->field('dataSize')->gte(10)
                        ->sort('publishedAt', 'desc')
                        ->getQuery()->execute();
        $pinnedProjects = $repository->findBy(['pinned' => true]);

        foreach ($projects as $project) {
            $project->setHomeUrl($this->generateUrlForProject($project));
        }
        foreach ($pinnedProjects as $project) {
            $project->setHomeUrl($this->generateUrlForProject($project));
        }

        return $this->render('saas/home.html.twig', [
            'projects' => $projects,
            'pinnedProjects' => $pinnedProjects,
            'config' => $config]);
    }

    // This route is to create an Admin User when the project is just created
    public function initializeAction(Request $request, DocumentManager $dm,
                                     UserManagerInterface $userManager,
                                     LoginManagerInterface $loginManager)
    {
        // Return if already existing users
        $users = $dm->getRepository('App\Document\User')->findAll();
        if (count($users) > 0) {
            return $this->redirectToRoute('gogo_homepage');
        }

        $config = $dm->getRepository('App\Document\Configuration')->findConfiguration();

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

    // In SAAS Mode, a project is being deleted by the owner
    public function deleteCurrProjectAction(DocumentManagerFactory $dmFactory)
    {
        $dm = $dmFactory->getCurrentManager();
        $dbName = $dmFactory->getCurrentDbName();
        $mongo = $dm->getConnection()->getMongoClient();
        $db = $mongo->selectDB($dbName);
        $db->command(['dropDatabase' => 1]);
        
        $rootDm = $dmFactory->getRootManager();
        $project = $rootDm->getRepository(Project::class)->findOneByDomainName($dbName);
        $rootDm->remove($project);
        $rootDm->flush();

        // Return to SAAS Home Page
        $url = $this->getParameter('base_protocol') . '://' . $this->getParameter('base_url');
        return $this->redirect($url);
    }
}