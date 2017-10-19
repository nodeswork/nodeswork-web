import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment                from 'moment';

import { ui }                     from '@nodeswork/applet/dist/ui';

import { AppletExecutionService } from '../../_services';

@Component({
  selector: 'app-user-applet-executions',
  templateUrl: './user-applet-executions.component.html',
  styleUrls: ['./user-applet-executions.component.css']
})
export class UserAppletExecutionsComponent implements OnInit {

  config:          ui.metrics.MetricsPanel;

  constructor(
    private route:               ActivatedRoute,
    private appletExecutions:    AppletExecutionService,
  ) {
    this.route.params.subscribe(async (params) => {
      const executionMonitoringGroup: ui.metrics.MetricsPanelGroup = {
        title:             'Execution Monitoring',
        dimensionConfigs:  [
          {
            name:          'account',
            filters:       [],
            enabled:       false,
          },
          {
            name:          'operator',
            filters:       [],
            enabled:       false,
          },
        ],
        metricsConfigs:    [
          {
            name:          'api_status',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'healthy_account',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
        ],
        graphs:            [
          {
            title:         'Account Healthy',
            width:         2,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'healthy_account',
              },
            ],
          },
          {
            title:         'API Status',
            width:         2,
            chart:         {
              type:        'lineChart',
            },
            percentage:    true,
            metrics:       [
              {
                name:      'api_status',
              },
            ],
          },
          {
            title:         'API Call Counts',
            width:         2,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:         'api_status',
                displayName:  'success',
                retrieve:     'numerator',
              },
              {
                name:         'api_status',
                displayName:  'total',
                retrieve:     'denominator',
              },
            ],
          },
        ],
      };

      const clubPerformanceGroup: ui.metrics.MetricsPanelGroup = {
        title:             'Club Performance',
        dimensionConfigs:  [
          {
            name:          'account',
            filters:       [],
            enabled:       false,
          },
          {
            name:          'contract_type',
            filters:       [],
            enabled:       false,
          },
        ],
        metricsConfigs:    [
          {
            name:          'credits',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'contracts_in_club',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'contracts_listing',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'club_value',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
        ],
        graphs:            [
          {
            title:         'Club Value',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'club_value',
                transform: 'Sum',
              },
            ],
          },
          {
            title:         'Credits',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'credits',
                transform: 'Sum',
              },
            ],
          },
          {
            title:         'Contracts In Club',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'contracts_in_club',
                transform: 'Count',
              },
            ],
          },
          {
            title:         'Contracts Listing',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'contracts_listing',
                transform: 'Count',
              },
            ],
          },
        ],
      };

      const contractsTradingGroup: ui.metrics.MetricsPanelGroup = {
        title:             'Contracts Trading',
        dimensionConfigs:  [
          {
            name:          'account',
            filters:       [],
            enabled:       false,
          },
          {
            name:          'contract_type',
            filters:       [],
            enabled:       false,
          },
        ],
        metricsConfigs:    [
          {
            name:          'contracts_sold',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'contracts_purchased',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'contracts_relisted',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'active_contracts_average',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'expired_contracts_average',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
        ],
        graphs:            [
          {
            title:         'Contracts Sold',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'contracts_sold',
              },
            ],
          },
          {
            title:         'Contracts Purchased',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'contracts_purchased',
              },
            ],
          },
          {
            title:         'Contracts Relisted',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'contracts_relisted',
              },
            ],
          },
          {
            title:         'Active Contracts Average',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'active_contracts_average',
              },
            ],
          },
          {
            title:         'Expired Contracts Average',
            width:         1,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:      'expired_contracts_average',
              },
            ],
          },
        ],
      };

      const contractsSearchGroup: ui.metrics.MetricsPanelGroup = {
        title:             'Contracts Search',
        dimensionConfigs:  [
          {
            name:          'account',
            filters:       [],
            enabled:       false,
          },
        ],
        metricsConfigs:    [
          {
            name:          'contracts_search_b150',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
          {
            name:          'contracts_search_b200',
            source:        `user-applets/${params.userAppletId}/executions`,
          },
        ],
        graphs:            [
          {
            title:         'Contracts Search Bid <= 150',
            width:         2,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:         'contracts_search_b150',
                displayName:  'searched',
                retrieve:     'denominator',
              },
              {
                name:         'contracts_search_b150',
                displayName:  'found',
                retrieve:     'numerator',
              },
            ],
          },
          {
            title:         'Contracts Search Max Bid = 200',
            width:         2,
            chart:         {
              type:        'lineChart',
            },
            metrics:       [
              {
                name:         'contracts_search_b200',
                displayName:  'searched',
                retrieve:     'denominator',
              },
              {
                name:         'contracts_search_b200',
                displayName:  'found',
                retrieve:     'numerator',
              },
            ],
          },
        ],
      };

      this.config = {
        rangeSelection:      {
          granularity:       600, // 3600,
          timerange:         {
            start:           - 12 * 3600 * 1000,
            end:             0,
          },
        },
        groups:              [
          executionMonitoringGroup,
          clubPerformanceGroup,
          contractsTradingGroup,
          contractsSearchGroup,
          {
            title:             'Executions',
            dimensionConfigs:  [
              {
                name:          'status',
                filters:       [],
                enabled:       true,
              },
            ],
            metricsConfigs:    [
              {
                name:          'result',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
            ],
            graphs:            [
              {
                title:         'Execution Count',
                chart:         {
                  type:        'multiBarChart',
                },
                width:         4,
                metrics:       [
                  {
                    name:      'result',
                  },
                ],
              },
            ],
          },
          {
            title:             'Contract Searching',
            dimensionConfigs:  [
            ],
            metricsConfigs:    [
              {
                name:          'Contract Searched',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
              {
                name:          'Contract Found',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
            ],
            graphs:            [
              {
                title:         'Contracts Searching',
                chart:         {
                  type:        'lineChart',
                },
                metrics:       [
                  {
                    name:      'Contract Searched',
                  },
                  {
                    name:      'Contract Found',
                  },
                ],
              },
            ],
          },
          {
            title:             'Bidding',
            dimensionConfigs:  [
              {
                name:          'Bid Status',
                filters:       [],
                enabled:       true,
              },
            ],
            metricsConfigs:    [
              {
                name:          'Bid',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
            ],
            graphs:            [
              {
                title:         'Bidding',
                chart:         {
                  type:        'lineChart',
                },
                metrics:       [
                  {
                    name:      'Bid',
                  },
                ],
              },
            ],
          },
        ],
      };
    });
  }

  ngOnInit() {
  }

}
