import { Component, OnInit, Input } from '@angular/core';

import {
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

  constructor(
    private userAppletsService: UserAppletsService,
  ) { }

  ngOnInit() {
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
}
