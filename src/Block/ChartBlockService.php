<?php

namespace App\Block;

use App\Document\ElementStatus;
use App\Document\InteractionType;
use App\Services\ConfigurationService;
use Doctrine\ODM\MongoDB\DocumentManager;
use Ob\HighchartsBundle\Highcharts\Highchart;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\BlockBundle\Block\BlockContextInterface;
use Sonata\BlockBundle\Block\Service\AbstractBlockService;
use Sonata\BlockBundle\Model\BlockInterface;
use Sonata\CoreBundle\Validator\ErrorElement;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class ChartBlockService extends AbstractBlockService
{
    protected $dm;
    protected $mongoDateStart;
    protected $mongoDateEnd;
    protected $dateStart;
    protected $dateEnd;
    protected $configService;

    protected $statusChoices = [
        '-6' => 'Doublon',
        '-4' => 'Supprimé',
        '-3' => 'Refusé (votes) ',
        '-2' => 'Refusé (admin)',
        '1' => 'Validé (admin)',
        '2' => 'Validé (votes)',
        '3' => 'Ajouté par admin',
        '4' => 'Modifié par admin',
        '5' => 'Modifié par propriétaire',
        '6' => 'Modifié avec lien direct',
        '7' => 'Importé',
    ];

    protected $statusColors = [
        '-6' => '#434348',
        '-4' => '#434348',
        '-3' => '#f7a35c',
        '-2' => '#dd4b39',
        '1' => '#00a65a',
        '2' => '#90ed7d',
        '3' => '#7a6ba7',
        '4' => '#7cb5ec',
        '5' => '#7cb5ec',
        '6' => '#7cb5ec',
        '7' => '#7cb5ec',
    ];

    public function __construct(Environment $twig, DocumentManager $dm, ConfigurationService $configService)
    {
        $this->dm = $dm;
        $this->configService = $configService;
        parent::__construct($twig);
    }

    public function getName()
    {
        return 'Chart';
    }

    public function getDefaultSettings()
    {
        return [];
    }

    public function validateBlock(ErrorElement $errorElement, BlockInterface $block)
    {
    }

    public function buildEditForm(FormMapper $formMapper, BlockInterface $block)
    {
    }

    public function execute(BlockContextInterface $blockContext, Response $response = null)
    {
        $timestampEnd = time();
        $timestampStart = $timestampEnd - (60 * 60 * 24 * 60);

        $this->mongoDateEnd = new \MongoDate($timestampEnd);    // Round to the day
        $this->mongoDateStart = new \MongoDate($timestampStart);        // Add one day to that

        $this->dateEnd = date('m/d/Y', $timestampEnd);
        $this->dateStart = date('m/d/Y', $timestampStart);

        // ----------------------
        // USER INTERACTION CHART
        // ----------------------
        $userInteractData = [
          ['type' => 'spline', 'name' => 'Ajouts', 'color' => '#7a6ba7', 'data' => $this->getDataContributionFromType(0)],
          ['type' => 'spline', 'name' => 'Modifications', 'color' => '#7cb5ec', 'data' => $this->getDataContributionFromType(1)],
          ['type' => 'spline', 'dashStyle' => 'shortDash', 'name' => 'Votes', 'color' => '#8bc34a', 'data' => $this->getDataVote()],
          ['type' => 'spline', 'dashStyle' => 'shortDash', 'name' => 'Signalements', 'color' => '#dd4b39', 'data' => $this->getDataReports()],
        ];

        $userInteractChart = new Highchart();
        $userInteractChart->chart->renderTo('userInteractChart');  // The #id of the div where to render the chart
        $userInteractChart->chart->zoomType('x');
        $userInteractChart->title->text('Statistiques des interactions utilisateur');
        $userInteractChart->subtitle->text('Click & drag pour zoomer sur une période');
        $userInteractChart->xAxis->type('datetime');
        $userInteractChart->yAxis->title(['text' => '']);
        $userInteractChart->tooltip->shared(true);
        $userInteractChart->tooltip->crosshairs(true);
        $userInteractChart->series($userInteractData);
        $userInteractChart->plotOptions->spline([
            'lineWidth' => 2,
         'states' => ['hover' => ['lineWidth' => 2]],
         'marker' => ['enabled' => false],
        ]);

        // ----------------------
        // COLLABORATIVE RESOLVED
        // ----------------------
        $collabResolveData = [
            ['type' => 'column', 'name' => 'Validations Collaborative', 'color' => '#90ed7d', 'data' => $this->getDataCollaborativeResolve(ElementStatus::CollaborativeValidate)],
           ['type' => 'column', 'name' => 'Refus collaboratifs', 'color' => '#f7a35c', 'data' => $this->getDataCollaborativeResolve(ElementStatus::CollaborativeRefused)],
        ];

        $collabResolveChart = new Highchart();
        $collabResolveChart->chart->renderTo('collabResolveChart');
        $collabResolveChart->xAxis->type('datetime');
        $collabResolveChart->yAxis->title(['text' => '']);
        $collabResolveChart->title->text('Validations/Refus collaboratifs');
        $userInteractChart->tooltip->shared(true);
        $userInteractChart->tooltip->crosshairs(true);
        $collabResolveChart->series($collabResolveData);

        // ----------------------
        // CONTRIBUTIONS RESOLVED
        // ----------------------
        $contribsAddResolvedPie = $this->createChartFormContribution([InteractionType::Add], 'Ajouts résolus', 'contribsAddResolvedPie');
        $contribsEditResolvedPie = $this->createChartFormContribution([InteractionType::Edit], 'Modifications résolues', 'contribsEditResolvedPie');

        return $this->renderResponse('admin/blocks/block_charts.html.twig', [
            'block' => $blockContext->getBlock(),
            'settings' => $blockContext->getSettings(),
            'userInteractChart' => $userInteractChart,
            'collabResolveChart' => $collabResolveChart,
            'contribsAddResolvedPie' => $contribsAddResolvedPie,
            'contribsEditResolvedPie' => $contribsEditResolvedPie,
            'customDashboard' => $this->configService->getConfig()->getCustomDashboard(),
       ], $response);
    }

    private function createChartFormContribution($types, $title, $name)
    {
        $data = $this->getDataHowContributionAreResolved($types);
        $contribResolvedData = [
            ['type' => 'pie', 'name' => 'Résolution des contributions', 'data' => $data],
        ];
        $totalContribs = 0;
        foreach ($data as $k => $val) {
            $totalContribs += $val['y'];
        }
        $contribsResolvedPie = new Highchart();
        $contribsResolvedPie->chart->renderTo($name);
        $contribsResolvedPie->title->text($title);
        $contribsResolvedPie->subtitle->text('Nombre Total (depuis le début): <b>'.$totalContribs.'</b>');
        $contribsResolvedPie->plotOptions->pie([
            'allowPointSelect' => true,
            'cursor' => 'pointer',
            'dataLabels' => ['enabled' => true, 'format' => '<b>{point.name}</b> : {point.y}'],
        ]);
        $contribsResolvedPie->tooltip->pointFormat('{series.name} : <b>{point.percentage:.1f}%</b>');
        $contribsResolvedPie->series($contribResolvedData);

        return $contribsResolvedPie;
    }

    private function dateRange($first, $last, $step = '+1 day', $format = 'm/d/Y')
    {
        $dates = [];
        $current = strtotime($first);
        $last = strtotime($last);

        while ($current <= $last) {
            $dates[date($format, $current)] = 0;
            $current = strtotime($step, $current);
        }

        return $dates;
    }

    private function getDataContributionFromType($type)
    {
        $builder = $this->dm->createAggregationBuilder('App\Document\UserInteractionContribution');
        $builder
        ->match()
            ->field('type')->equals($type)
            ->field('status')->notEqual(7); // Do not get dynamic import in chart
        return $this->getDataGroupedBy($builder, 'createdAt');
    }

    private function getDataVote()
    {
        $builder = $this->dm->createAggregationBuilder('App\Document\UserInteractionVote');

        return $this->getDataGroupedBy($builder, 'createdAt');
    }

    private function getDataReports()
    {
        $builder = $this->dm->createAggregationBuilder('App\Document\UserInteractionReport');

        return $this->getDataGroupedBy($builder, 'createdAt');
    }

    private function getDataCollaborativeResolve($status)
    {
        $builder = $this->dm->createAggregationBuilder('App\Document\UserInteractionContribution');
        $builder
        ->match()
            ->field('status')->equals($status);

        return $this->getDataGroupedBy($builder, 'updatedAt');
    }

    private function getDataGroupedBy($builder, $groupField)
    {
        $builder->match()
         ->field($groupField)->gte($this->mongoDateStart)
         ->field($groupField)->lte($this->mongoDateEnd);

        $builder
        ->group()
            ->field('_id')
            ->expression(
                $builder->expr()
                    ->field('day')
                    ->dateToString('%m/%d/%Y', '$'.$groupField)
                )
            ->field('count')
                ->sum(1)
        ;

        $results = $builder->execute()->toArray();

        $results = array_map(function ($x) {
            $date = date_create($x['_id']['day']);
            $timestamp = $date->getTimestamp();

            return [
                'date' => $date,
                'date_mdy' => $x['_id']['day'],
                'timestamp' => $timestamp,
                'count' => $x['count'],
            ];
        }, $results);

        usort($results, function ($a, $b) { return $a['timestamp'] - $b['timestamp']; });

        $range = $this->dateRange($this->dateStart, $this->dateEnd);

        foreach ($results as $key => $value) {
            $range[$value['date_mdy']] = $value['count'];
        }

        $data = [];
        foreach ($range as $key => $value) {
            $data[] = [(date_create($key)->getTimestamp() + 3600) * 1000, $value];
        }

        return $data;
    }

    private function filterInRange($qb, $field)
    {
        $qb->field($field)->gte($this->mongoDateStart);
        $qb->field($field)->lte($this->mongoDateEnd);

        return $qb;
    }

    private function getDataHowContributionAreResolved($types)
    {
        $builder = $this->dm->createAggregationBuilder('App\Document\UserInteractionContribution');
        $builder
          ->match()
                ->field('type')->in($types)
                ->field('userRole')->notEqual('3') // not by an admin
                ->field('status')->notIn([-5, null, 7, 8]) // -5 = pending modification, null = not resolved, 7 & 8 = dynamic import
        ->group()
            ->field('_id')
            ->expression('$status')
            ->field('count')
                ->sum(1)
        ;
        $results = $builder->execute()->toArray();

        $results = array_map(function ($x) {
            return [
                'name' => $this->statusChoices[$x['_id']],
                'color' => $this->statusColors[$x['_id']],
                'y' => $x['count'],
            ];
        }, $results);

        return $results;
    }
}
