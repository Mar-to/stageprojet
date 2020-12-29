<?php

namespace App\DataFixtures\MongoDB;

use App\Document\AutomatedMailConfiguration;
use App\Document\Configuration;
use App\Document\Configuration\ConfigurationApi;
use App\Document\Configuration\ConfigurationHome;
use App\Document\Configuration\ConfigurationInfobar;
use App\Document\Configuration\ConfigurationMarker;
use App\Document\Configuration\ConfigurationMenu;
use App\Document\Configuration\ConfigurationUser;
use App\Document\FeatureConfiguration;
use App\Document\TileLayer;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Persistence\ObjectManager;

class LoadConfiguration implements FixtureInterface
{
    public function load(ObjectManager $dm, $container = null, $configToCopy = null, $contribConfig = 'open')
    {
        $configuration = new Configuration();
        $tileLayersToCopy = null;

        if ($configToCopy) {
            foreach ($configToCopy as $key => $value) {
                if ($value && !in_array($key, ['id', 'appSlug', 'appTags', 'defaultTileLayer', 'logo', 'logoInline', 'socialShareImage', 'favicon', 'tileLayers'])) {
                    // dealing with subobjects
                    if (is_object($value)) {
                        if (false !== strpos($key, 'Feature')) {
                            $object = new FeatureConfiguration();
                        } elseif (false !== strpos($key, 'Mail')) {
                            $object = new AutomatedMailConfiguration();
                        } elseif ('user' == $key) {
                            $object = new ConfigurationUser();
                        } elseif ('infobar' == $key) {
                            $object = new ConfigurationInfobar();
                        } elseif ('api' == $key) {
                            $object = new ConfigurationApi();
                        } elseif ('menu' == $key) {
                            $object = new ConfigurationMenu();
                        } elseif ('home' == $key) {
                            $object = new ConfigurationHome();
                        } elseif ('marker' == $key) {
                            $object = new ConfigurationMarker();
                        }

                        foreach ($value as $subkey => $subvalue) {
                            if ($subvalue && !in_array($subkey, ['id'])) {
                                $subkey = 'set'.ucfirst($subkey);
                                $object->$subkey($subvalue);
                            }
                        }
                        $value = $object;
                    }
                    $key = 'set'.ucfirst($key);
                    $configuration->$key($value);
                }
            }
            $tileLayersToCopy = $configToCopy->tileLayers;
        } else {
            $configuration->setAppName('GoGoCarto');
            $configuration->setAppSlug('gogocarto');
            $configuration->setAppBaseline('Créez des cartes à GoGo');

            $activateHomePage;
            $configuration->setActivatePartnersPage(true);
            $configuration->setPartnerPageTitle('Partenaires');
            $configuration->setActivateAbouts(true);
            $configuration->setAboutHeaderTitle('A propos');

            // HOME
            $configuration->setActivateHomePage(true);
            $confHome = new ConfigurationHome();
            $confHome->setDisplayCategoriesToPick(false);
            $confHome->setAddElementHintText('Contribuez à enrichir la base de donnée !');
            $confHome->setSeeMoreButtonText('En savoir plus');
            $configuration->setHome($confHome);

            if ($container) {
                $confUser = new ConfigurationUser();
                $confUser->setLoginWithLesCommuns('disabled' != $container->getParameter('oauth_communs_id'));
                $confUser->setLoginWithGoogle('disabled' != $container->getParameter('oauth_google_id'));
                $confUser->setLoginWithFacebook('disabled' != $container->getParameter('oauth_facebook_id'));
                $configuration->setUser($confUser);
            }

            // FEATURES
            $configuration->setFavoriteFeature(new FeatureConfiguration(true, false, true, true, true));
            $configuration->setShareFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setExportIframeFeature(new FeatureConfiguration(true, false, true, true, true));
            $configuration->setDirectionsFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setPendingFeature(new FeatureConfiguration(true, false, true, true, true));
            $configuration->setCustomPopupFeature(new FeatureConfiguration());
            $configuration->setStampFeature(new FeatureConfiguration(true, false, true, true, true));
            $configuration->setSearchPlaceFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setSearchGeolocateFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setLayersFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setMapDefaultViewFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setListModeFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setSearchElementsFeature(new FeatureConfiguration(true, true, true, true, true));

            // default bounds to France
            $configuration->setDefaultNorthEastBoundsLat(52);
            $configuration->setDefaultNorthEastBoundsLng(10);
            $configuration->setDefaultSouthWestBoundsLat(40);
            $configuration->setDefaultSouthWestBoundsLng(-5);

            // FORM
            $configuration->setElementFormGeocodingHelp('Ne mettez pas de ponctuation, les noms tout en majuscules ne sont pas reconnus non plus. Si la localisation ne fonctionne pas (il arrive que certaines adresses ne soient pas reconnues), entrez le nom de la ville/le village le plus proche, cliquez sur « Localiser », puis placer le point de localisation manuellement. Re-rentrez l’adresse complète dans la barre et passez à la suite du formulaire sans re-cliquer sur « localiser ».');
            $configuration->setCollaborativeModerationExplanations("
            <p>
              Lorsqu'un élément est ajouté ou modifié, la mise à jour des données n'est pas instantanée. L'élément va d'abords apparaître \"grisé\" sur la carte,
              et il sera alors possible à tous les utilisateurs logué de voter une et une seule fois pour cet élément.
              Ce vote n'est pas une opinion, mais un partage de connaissance.
              Si vous connaissez cet élément, ou savez que cet élément n'existe pas, alors votre savoir nous intéresse !
            </p>
            <p>
              Au bout d'un certain nombre de votes, l'élément pourra alors être automatiquement validé ou refusé.
              En cas de litige (des votes à la fois positifs et négatifs), un modérateur interviendra au plus vite. On compte sur vous!
            </p>");

            // IMPORT
            $configuration->setFontImport('');
            $configuration->setIconImport('');

            // STYLE
            $configuration->setMainFont('Nunito, sans-serif');
            $configuration->setTitleFont('Nunito, sans-serif');
            $configuration->setTextColor('#495057');
            $configuration->setPrimaryColor('#64d29b');
            $configuration->setBackgroundColor('#f4f4f4');
            $configuration->setTheme('flat');
            $configuration->setCustomCSS('');
        }

        $this->initContributionConfig($configuration, $contribConfig);

        $defaultTileLayerName = $configToCopy ? $configToCopy->defaultTileLayer : null;
        $defaultLayer = $this->loadTileLayers($dm, $tileLayersToCopy, $defaultTileLayerName);
        $configuration->setDefaultTileLayer($defaultLayer);
        $dm->persist($configuration);
        $dm->flush();

        return $configuration;
    }

    public function initContributionConfig($configuration, $contribConfig = 'open')
    {
        switch ($contribConfig) {
        case 'intermediate':
            $configuration->setAddFeature(new FeatureConfiguration(true, true, false, true, true));
            $configuration->setEditFeature(new FeatureConfiguration(true, true, false, true, true));
            $configuration->setDeleteFeature(new FeatureConfiguration(true, false, false, false, false));
            $configuration->setCollaborativeModerationFeature(new FeatureConfiguration(true, false, false, false, true));
            $configuration->setDirectModerationFeature(new FeatureConfiguration(true, false, false, false, false));
            $configuration->setReportFeature(new FeatureConfiguration(true, false, true, true, false));
            break;
        case 'closed':
            $configuration->setAddFeature(new FeatureConfiguration(true, true, false, false, false));
            $configuration->setEditFeature(new FeatureConfiguration(true, true, false, false, false));
            $configuration->setDeleteFeature(new FeatureConfiguration(true, true, false, false, false));
            $configuration->setCollaborativeModerationFeature(new FeatureConfiguration(false, false, false, false, false));
            $configuration->setDirectModerationFeature(new FeatureConfiguration(true, false, false, false, false, true));
            $configuration->setReportFeature(new FeatureConfiguration(false, false, false, false, false));
            break;
        default:
            // open by default
            $configuration->setAddFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setEditFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setDeleteFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setCollaborativeModerationFeature(new FeatureConfiguration(false, false, false, false, false));
            $configuration->setDirectModerationFeature(new FeatureConfiguration(true, true, true, true, true));
            $configuration->setReportFeature(new FeatureConfiguration(false, false, false, false, false));
            break;
        }
    }

    public function loadTileLayers($dm, $tileLayersToCopy = null, $defaultTileLayerName = null)
    {
        $tileLayers = $tileLayersToCopy ? $tileLayersToCopy : [
         ['name' => 'cartodb',
              'url' => 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
              'attribution' => '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', ],
         ['name' => 'hydda',
              'url' => 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
              'attribution' => 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', ],
         ['name' => 'wikimedia',
              'url' => 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
              'attribution' => '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a> | Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>', ],
         ['name' => 'lyrk',
              'url' => 'https://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=982c82cc765f42cf950a57de0d891076',
              'attribution' => '&copy Lyrk | Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', ],
         ['name' => 'osmfr',
              'url' => 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
              'attribution' => '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', ],
         ['name' => 'stamenWaterColor',
              'url' => 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
              'attribution' => 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', ],
      ];

        $defaultTileLayer = null;
        $createdTileLayers = [];
        foreach ($tileLayers as $key => $layer) {
            $layer = (array) $layer;
            if (!in_array($layer['name'], $createdTileLayers)) {
                $tileLayer = new TileLayer();
                $tileLayer->setName($layer['name']);
                $tileLayer->setUrl($layer['url']);
                $tileLayer->setAttribution($layer['attribution']);
                $position = array_key_exists('position', $layer) ? $layer['position'] : $key;
                $tileLayer->setPosition($key);
                $dm->persist($tileLayer);
                $createdTileLayers[] = $layer['name'];

                if (null == $defaultTileLayer && null == $defaultTileLayerName) {
                    $defaultTileLayer = $tileLayer;
                }
                if (null == $defaultTileLayer && null != $defaultTileLayerName && $layer['name'] == $defaultTileLayerName) {
                    $defaultTileLayer = $tileLayer;
                }
            }
        }

        return $defaultTileLayer;
    }
}
