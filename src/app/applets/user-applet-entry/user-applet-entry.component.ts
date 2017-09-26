import { Component, OnInit, Input } from '@angular/core';

import {
  AppletWorkerConfig,
  UserApplet,
}                                   from '../../_models';
import {
  UserAppletsService,
}                                   from '../../_services';

@Component({
  selector: 'app-user-applet-entry',
  templateUrl: './user-applet-entry.component.html',
  styleUrls: ['./user-applet-entry.component.css']
})
export class UserAppletEntryComponent implements OnInit {

  @Input() userApplet: UserApplet;
  defaultAction: AppletWorkerConfig;

  constructor(
    private userAppletsService: UserAppletsService,
  ) { }

  ngOnInit() {
    if (this.userApplet) {
      this.defaultAction = this.userApplet.config.appletConfig.workers[0];
    }
  }

  async update() {
    const updateApplet = {
      config: this.userApplet.config,
      enabled: true,
    };
    updateApplet.config.appletConfig = this.userApplet.applet.config;
    this.userApplet = await this.userAppletsService.update(
      this.userApplet._id,
      updateApplet as UserApplet,
    );
  }

  async action(worker: AppletWorkerConfig) {
    const resp = await this.userAppletsService.work(this.userApplet._id, worker);
    console.log(resp);
  }
}
