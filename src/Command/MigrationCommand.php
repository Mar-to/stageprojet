<?php

namespace App\Command;

use App\Document\GoGoLogUpdate;
use App\Document\MigrationState;
use App\Services\AsyncService;
use Doctrine\ODM\MongoDB\DocumentManager;
use App\Services\DocumentManagerFactory;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Process;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Command to update database when schema need migration
 * Also provide some update message in the admin dashboard.
 */
class MigrationCommand extends GoGoAbstractCommand
{
    // -----------------------------------------------------------------
    // DO NOT REMOVE A SINGLE ELEMENT OF THOSE ARRAYS, ONLY ADD NEW ONES
    // -----------------------------------------------------------------
    public static $migrations = [
      // v2.4.6
      'db.TileLayer.updateMany({name:"cartodb"}, {$set: {attribution:"&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>"}})',
      'db.TileLayer.updateMany({name:"hydda"}, {$set: {attribution:"Tiles courtesy of <a href=\"http://openstreetmap.se/\" target=\"_blank\">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      'db.TileLayer.updateMany({name:"wikimedia"}, {$set: {attribution:"<a href=\"https://wikimediafoundation.org/wiki/Maps_Terms_of_Use\">Wikimedia</a> | Map data © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>"}})',
      'db.TileLayer.updateMany({name:"lyrk"}, {$set: {attribution:"&copy Lyrk | Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      'db.TileLayer.updateMany({name:"osmfr"}, {$set: {attribution:"&copy; Openstreetmap France | &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      'db.TileLayer.updateMany({name:"stamenWaterColor"}, {$set: {attribution:"Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      // v3.1.0
      "db.Element.dropIndex(\"name_text\");",
      "db.Element.dropIndex(\"search_index\");",
      "db.Element.createIndex( {name: \"text\"}, { name: \"search_index\", default_language: \"french\", weights: {name: 1} })"
    ];

    public static $commands = [
      // v2.3.1
      'app:elements:updateJson all',
      // v2.3.4
      'app:elements:updateJson all',
      // v2.4.5
      'app:elements:updateJson all',
    ];

    public static $messages = [
        // v2.3.0
        'Un champ <b>Image (url)</b> est maintenant disponible dans la confiugration du formulaire !',
        "Vous pouvez désormais customizer la popup qui s'affiche au survol d'un marqueur. Allez dans Personnalisation -> Marqueur / Popup",
        "Nouvelle option pour le menu (Personnalisation -> La Carte -> onglet Menu) : afficher à côté de chaque catégories le nombre d'élements disponible pour cette catégorie",
        // v2.3.1
        'Vous pouvez maintenant renseigner la licence qui protège vos données dans Personnalisation -> Configuration Générale',
        // v2.3.4
        "Amélioration du <b>système d'import</b>: vous pouvez maintenant faire correspondre les champs et les catégories avant d'importer. Des vidéos tutoriels ont été réalisés. <u>Merci de parcourir vos imports dynamiques pour les mettre à jour avec le nouveau système</u>",
        "<b>La gestion des permissions des utilisateurs fait peau neuve !</b> <u>Votre ancienne configuration ne sera peut être plus valide</u>. Veuillez vous rendre dans le <b>menu Utilisateurs pour mettre à jour les roles des utilisateurs et des groupes</b> d'utilisateurs.",
        'Vous pouvez maintenant configurer des mot clés à exclure dans la recherche des éléments. Rendez-vous dans Personnalisation -> La Carte -> Onglet Recherche',
        // v2.5
        "Il est maintenant possible de <b>téléverser des images et des fichiers</b> depuis le formulaire d'ajout d'un élément ! Paramétrez ces nouveaux champs dans Modèle de Données -> Formulaire",
        // v3.0
        "Vous pouvez maintenant écrire des actualités qui seront incluses dans la newsletter automatique! Allez dans Mails/Newsletter -> Actualités",
        "L'export des éléments depuis la page Données -> Elements fonctionne de nouveau et inclus cette fois correctement tous les champs personnalisés (y compris fichiers et images)",
        "Depuis le site, la recherche par élément peut maintenant fonctionenr sur plusieurs champs. Dans Modèle de Données -> Formulaire, editez un champ pour voir apparaitre la configuration liée à la recherche. Vous pouvez aussi donner des poids différents à chaque champs, par exemple la recherche sur le titre avec un poids de 3 et la recherche dans la description avec un poids de 1",
        "Nouveau moteur de recherche ! Sur la carte, lorsqu'on tape une recherche des suggestions apparaissent pour les éléments et les catégories (bientôt aussi pour les recherchent géographiques)",
        // v3.2
        "Vous pouvez maintenant configurer l'url de votre carte si vous possédez un nom de domaine (ou un sous domaine). Allez dans Personnalisation -> Configuration Générale et suivez les instructions !"
    ];

    public function __construct(DocumentManagerFactory $dm, LoggerInterface $commandsLogger,
                               TokenStorageInterface $security,
                               AsyncService $asyncService)
    {
        $this->asyncService = $asyncService;
        parent::__construct($dm, $commandsLogger, $security);
    }

    protected function gogoConfigure(): void
    {
        $this->setName('db:migrate')
             ->setDescription('Update datatabse each time after code update');
    }

    protected function gogoExecute(DocumentManager $dm, InputInterface $input, OutputInterface $output): void
    {
        $migrationState = $dm->createQueryBuilder('App\Document\MigrationState')->getQuery()->getSingleResult();
        if (null == $migrationState) { // Meaning the migration state was not yet in the place in the code
            $migrationState = new MigrationState();
            $dm->persist($migrationState);
        }

        try {
            // Collecting the Database to be updated
            $dbs = ['gogocarto_default'];
            $dbNames = $dm->createQueryBuilder('App\Document\Project')->select('domainName')->hydrate(false)->getQuery()->execute()->toArray();
            foreach ($dbNames as $object) {
                $dbs[] = $object['domainName'];
            }

            if (count(self::$migrations) > $migrationState->getMigrationIndex()) {
                $migrationsToRun = array_slice(self::$migrations, $migrationState->getMigrationIndex());
                $migrationsToRun = array_unique($migrationsToRun);
                foreach ($dbs as $db) {
                    foreach ($migrationsToRun as $migration) {
                        $this->log('run migration '.$migration.' on project '.$db);
                        $this->runMongoCommand($dm, $db, $migration);
                    }
                }
                $this->log(count($migrationsToRun).' migrations performed');
            } else {
                $this->log('No Migrations to perform');
            }

            // run them syncronously otherwise all the command will be run at once
            $this->asyncService->setRunSynchronously(true);
            if (count(self::$commands) > $migrationState->getCommandsIndex()) {
                $commandsToRun = array_slice(self::$commands, $migrationState->getCommandsIndex());
                $commandsToRun = array_unique($commandsToRun);
                $this->log(count($commandsToRun).' commands to run');
                foreach ($dbs as $db) {
                    foreach ($commandsToRun as $command) {
                        $this->log('call command '.$command.' on project '.$db);
                        $this->asyncService->callCommand($command, [], $db);
                    }
                }
            } else {
                $this->log('No commands to run');
            }

            if (count(self::$messages) > $migrationState->getMessagesIndex()) {
                $messagesToAdd = array_slice(self::$messages, $migrationState->getMessagesIndex());
                $this->log(count($messagesToAdd).' messages to add');
                foreach ($dbs as $db) {
                    $this->log('add message on project '.$db);
                    foreach ($messagesToAdd as $message) {
                        // create a GoGoLogUpdate
                        $this->asyncService->callCommand('gogolog:add:message', ['"'.$message.'"'], $db);
                    }
                }
                $this->log(count($messagesToAdd).' messages added to admin dashboard');
            } else {
                $this->log('No Messages to add to dashboard');
            }
        } catch (\Exception $e) {
            $message = $e->getMessage().'</br>'.$e->getFile().' LINE '.$e->getLine();
            $this->error('Error performing migrations: '.$message);
        }

        $migrationState->setMigrationIndex(count(self::$migrations));
        $migrationState->setCommandsIndex(count(self::$commands));
        $migrationState->setMessagesIndex(count(self::$messages));
        $dm->flush();
    }

    private function runMongoCommand($dm, $dbName, $command)
    {
        $mongo = $dm->getConnection()->getMongoClient();
        $db = $mongo->selectDB($dbName);
        return $db->execute($command);
    }
}
