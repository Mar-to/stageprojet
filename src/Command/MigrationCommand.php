<?php

namespace App\Command;

use App\Command\GoGoAbstractCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Document\MigrationState;
use App\Document\GoGoLogUpdate;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Process\Process;
/**
 * Command to update database when schema need migration
 * Also provide some update message in the admin dashboard
 */
class MigrationCommand extends GoGoAbstractCommand
{
    // -----------------------------------------------------------------
    // DO NOT REMOVE A SINGLE ELEMENT OF THOSE ARRAYS, ONLY ADD NEW ONES
    // -----------------------------------------------------------------
    public $migrations = [
      // v2.4.6
      'db.TileLayer.updateMany({name:"cartodb"}, {$set: {attribution:"&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>"}})',
      'db.TileLayer.updateMany({name:"hydda"}, {$set: {attribution:"Tiles courtesy of <a href=\"http://openstreetmap.se/\" target=\"_blank\">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      'db.TileLayer.updateMany({name:"wikimedia"}, {$set: {attribution:"<a href=\"https://wikimediafoundation.org/wiki/Maps_Terms_of_Use\">Wikimedia</a> | Map data © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>"}})',
      'db.TileLayer.updateMany({name:"lyrk"}, {$set: {attribution:"&copy Lyrk | Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      'db.TileLayer.updateMany({name:"osmfr"}, {$set: {attribution:"&copy; Openstreetmap France | &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
      'db.TileLayer.updateMany({name:"stamenWaterColor"}, {$set: {attribution:"Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"}})',
    ];

    public $commands = [
      // v2.3.1
      "app:elements:updateJson all",
      // v2.3.4
      "app:elements:updateJson all",
      // v2.4.5
      "app:elements:updateJson all"
    ];

    public $messages = [
        // v2.3.0
        "Un champ <b>Image (url)</b> est maintenant disponible dans la confiugration du formulaire !",
        "Vous pouvez désormais customizer la popup qui s'affiche au survol d'un marqueur. Allez dans Personnalisation -> Marqueur / Popup",
        "Nouvelle option pour le menu (Personnalisation -> La Carte -> onglet Menu) : afficher à côté de chaque catégories le nombre d'élements disponible pour cette catégorie",
        // v2.3.1
        "Vous pouvez maintenant renseigner la licence qui protège vos données dans Personnalisation -> Configuration Générale",
        // v2.3.4
        "Amélioration du <b>système d'import</b>: vous pouvez maintenant faire correspondre les champs et les catégories avant d'importer. Des vidéos tutoriels ont été réalisés. <u>Merci de parcourir vos imports dynamiques pour les mettre à jour avec le nouveau système</u>",
        "<b>La gestion des permissions des utilisateurs fait peau neuve !</b> <u>Votre ancienne configuration ne sera peut être plus valide</u>. Veuillez vous rendre dans le <b>menu Utilisateurs pour mettre à jour les roles des utilisateurs et des groupes</b> d'utilisateurs.",
        "Vous pouvez maintenant configurer des mot clés à exclure dans la recherche des éléments. Rendez-vous dans Personnalisation -> La Carte -> Onglet Recherche",
        // v2.5
        "Il est maintenant possible de <b>téléverser des images et des fichiers</b> depuis le formulaire d'ajout d'un élément ! Paramétrez ces nouveaux champs dans Modèle de Données -> Formulaire"
    ];


    protected function gogoConfigure()
    {
        $this->setName('db:migrate')
             ->setDescription('Update datatabse each time after code update');
    }

    protected function gogoExecute($dm, InputInterface $input, OutputInterface $output)
    {
        $migrationState = $dm->createQueryBuilder('App\Document\MigrationState')->getQuery()->getSingleResult();
        if ($migrationState == null) // Meaning the migration state was not yet in the place in the code
        {
            $migrationState = new MigrationState();
            $dm->persist($migrationState);
        }

        try {
            // Collecting the Database to be updated
            $dbs = ['gogocarto_default'];
            $dbNames = $dm->createQueryBuilder('App\Document\Project')->select('domainName')->hydrate(false)->getQuery()->execute()->toArray();
            foreach ($dbNames as $object) { $dbs[] = $object['domainName']; }

            if (count($this->migrations) > $migrationState->getMigrationIndex()) {
                $migrationsToRun = array_slice($this->migrations, $migrationState->getMigrationIndex());
                $migrationsToRun = array_unique($migrationsToRun);
                foreach($dbs as $db) {
                    foreach($migrationsToRun as $migration) {
                        $this->log("run migration " . $migration . " on project " . $db);
                        $this->runMongoCommand($db, $migration);
                    }
                }
                $this->log(count($migrationsToRun) . " migrations performed");
            } else {
                $this->log("No Migrations to perform");
            }

            $asyncService = $this->getContainer()->get('gogo.async');
            // run them syncronously otherwise all the command will be run at once
            $asyncService->setRunSynchronously(true);
            if (count($this->commands) > $migrationState->getCommandsIndex()) {
                $commandsToRun = array_slice($this->commands, $migrationState->getCommandsIndex());
                $commandsToRun = array_unique($commandsToRun);
                $this->log(count($commandsToRun) . " commands to run");
                foreach($dbs as $db) {
                    foreach($commandsToRun as $command) {
                        $this->log("call command " . $command . " on project " . $db);
                        $asyncService->callCommand($command, [], $db);
                    }
                }
            } else {
                $this->log("No commands to run");
            }

            if (count($this->messages) > $migrationState->getMessagesIndex()) {
                $messagesToAdd = array_slice($this->messages, $migrationState->getMessagesIndex());
                $this->log(count($messagesToAdd) . " messages to add");
                foreach($dbs as $db) {
                    $this->log("add message on project " . $db);
                    foreach($messagesToAdd as $message) {
                        // create a GoGoLogUpdate
                        $asyncService->callCommand('gogolog:add:message', ['"' . $message . '"'], $db);
                    }
                }
                $this->log(count($messagesToAdd) . " messages added to admin dashboard");
            } else {
                $this->log("No Messages to add to dashboard");
            }
        }
        catch (\Exception $e) {
            $message = $e->getMessage() . '</br>' . $e->getFile() . ' LINE ' . $e->getLine();
            $this->error("Error performing migrations: " . $message);
        }

        $migrationState->setMigrationIndex(count($this->migrations));
        $migrationState->setCommandsIndex(count($this->commands));
        $migrationState->setMessagesIndex(count($this->messages));
        $dm->flush();
    }

    private function runMongoCommand($db, $command)
    {
        $process = new Process("mongo {$db} --eval '{$command}'");
        return $process->run();
    }
}