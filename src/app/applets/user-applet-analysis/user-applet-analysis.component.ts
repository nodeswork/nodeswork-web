import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AppletExecutionService,
  UserAppletsService,
}                                 from '../../_services';

import { ui }                     from '@nodeswork/applet/dist/ui';

@Component({
  selector: 'app-user-applet-analysis',
  templateUrl: './user-applet-analysis.component.html',
  styleUrls: ['./user-applet-analysis.component.css']
})
export class UserAppletAnalysisComponent implements OnInit {

  role:    string;
  config:  ui.metrics.MetricsPanel;

  constructor(
    private route:               ActivatedRoute,
    private router:              Router,
    private appletExecutions:    AppletExecutionService,
    private userAppletsService:  UserAppletsService,
  ) {
    this.route.params.subscribe(async (params) => {
      this.role = `user-applets/${params.userAppletId}`;
      try {
        const resp = await this.userAppletsService.routeGet(
          params.userAppletId, 'analysis',
        );
        this.config = resp;
      } catch (e) {
        if (e.status === 404) {
          this.router.navigate(
            [`/my-applets/${params.userAppletId}/executions`],
          );
        } else {
          throw e;
        }
      }
    });
  }

  ngOnInit() {
  }
}
