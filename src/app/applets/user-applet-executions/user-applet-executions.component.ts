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
      this.config = {
        rangeSelection:      {
          granularity:       600, // 3600,
          timerange:         {
            start:           moment().subtract(2, 'day').toDate().getTime(),
            end:             moment().toDate().getTime(),
          },
        },
        groups:              [
          {
            title:             '',
            dimensionConfigs:  [
              {
                name:          'Account',
                filters:       [],
                enabled:       true,
              },
            ],
            metricsConfigs:    [
              {
                name:          'Credits',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
              {
                name:          'Listing Size',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
            ],
            graphs:            [
              {
                title:         'Credits',
                width:         2,
                chart:         {
                  type:        'lineChart',
                },
                metrics:       [
                  {
                    name:      'Credits',
                  },
                ],
              },
              {
                title:         'Listing Size',
                width:         2,
                chart:         {
                  type:        'lineChart',
                },
                metrics:       [
                  {
                    name:      'Listing Size',
                  },
                ],
              },
            ],
          },
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
          {
            title:             'Sold',
            dimensionConfigs:  [
              {
                name:          'Account',
                filters:       [],
                enabled:       true,
              },
            ],
            metricsConfigs:    [
              {
                name:          'Sold',
                source:        `user-applets/${params.userAppletId}/executions`,
              },
            ],
            graphs:            [
              {
                title:         'Sold',
                chart:         {
                  type:        'lineChart',
                },
                metrics:       [
                  {
                    name:      'Sold',
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
