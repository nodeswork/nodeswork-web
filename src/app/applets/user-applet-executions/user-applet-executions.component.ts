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
            enabled:       true,
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
        ],
      };

      const clubPerformanceGroup: ui.metrics.MetricsPanelGroup = {
        title:             'Club Performance',
        dimensionConfigs:  [
          {
            name:          'account',
            filters:       [],
            enabled:       true,
          },
          {
            name:          'contract_type',
            filters:       [],
            enabled:       true,
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
            enabled:       true,
          },
          {
            name:          'contract_type',
            filters:       [],
            enabled:       true,
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

      this.config = {
        rangeSelection:      {
          granularity:       600, // 3600,
          timerange:         {
            start:           - 4 * 3600 * 1000,
            end:             0,
          },
        },
        groups:              [
          executionMonitoringGroup,
          clubPerformanceGroup,
          contractsTradingGroup,
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
