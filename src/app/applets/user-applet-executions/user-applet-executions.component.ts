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
        rangeSelection:  {
          granularity:   moment.duration(10, 'minutes').toISOString(),
          timeRange:     {
            start:       moment().subtract(2, 'day').toDate(),
            end:         moment().toDate(),
          },
        },
        groups:          [{
          title:         'Executions',
          dimensionConfigs:  [],
          metricsConfigs:    [
            {
              name: 'result',
              source: `user-applets/${params.userAppletId}/executions`,
            },
          ],
          graphs:            [],
        }],
      };
    });
  }

  ngOnInit() {
  }

}
