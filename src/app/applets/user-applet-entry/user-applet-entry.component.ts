import * as _                              from 'underscore';
import { Component, OnInit, Input }        from '@angular/core';
import { MatDialog }                       from '@angular/material';

import {
  AppletWorkerConfig,
  UserApplet,
}                                          from '../../_models';
import {
  UserAppletsService,
}                                          from '../../_services';
import { UserAppletActionResultComponent } from '../user-applet-action-result/user-applet-action-result.component';

@Component({
  selector: 'app-user-applet-entry',
  templateUrl: './user-applet-entry.component.html',
  styleUrls: ['./user-applet-entry.component.css']
})
export class UserAppletEntryComponent implements OnInit {

  @Input() userApplet:  UserApplet;
  defaultAction:        AppletWorkerConfig;
  loading:              boolean;

  constructor(
    private userAppletsService:  UserAppletsService,
    private dialog:              MatDialog,
  ) { }

  ngOnInit() {
    if (this.userApplet) {
      this.defaultAction = _.find(
        this.userApplet.config.appletConfig.workers,
        (worker) => worker.default,
      );
    }
  }

  async update() {
    this.loading = true;
    const updateApplet = {
      config: this.userApplet.config,
      enabled: true,
    };
    updateApplet.config.appletConfig = this.userApplet.applet.config;
    this.userApplet = await this.userAppletsService.update(
      this.userApplet._id,
      updateApplet as UserApplet,
    );
    this.loading = false;
  }

  async action(worker: AppletWorkerConfig) {
    const data: any = {
      worker,
      status: 'ok',
    };
    try {
      this.loading  = true;
      const resp    = await this.userAppletsService.work(this.userApplet._id, worker);
      data.resp     = resp;
    } catch (e) {
      data.status = 'error';
      data.error  = e.error;
    } finally {
      this.loading = false;
      this.dialog.open(UserAppletActionResultComponent, { data });
    }
  }
}
