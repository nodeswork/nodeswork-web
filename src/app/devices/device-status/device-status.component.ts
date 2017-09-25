import * as _                     from 'underscore';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar }            from '@angular/material';

import {
  Device,
  UserApplet,
  AppletImage,
}                                 from '../../_models';
import {
  DevicesService,
  UserAppletsService,
}                                 from '../../_services';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.css']
})
export class DeviceStatusComponent implements OnInit {

  device:            Device;
  userApplets:       UserApplet[];
  runningApplets:    UserAppletInfo[];
  scheduledApplets:  UserAppletInfo[];

  constructor(
    private route:               ActivatedRoute,
    private devicesService:      DevicesService,
    private userAppletsService:  UserAppletsService,
    private snackBar:            MatSnackBar,
  ) {
    this.route.params.subscribe(async (params) => {
      this.device = await this.devicesService.get(params.deviceId);
      this.userAppletsService.myApplets().subscribe((userApplets) => {
        this.userApplets = userApplets;
        this.init();
      });
    });
  }

  private async init() {
    if (!this.device.online) {
      this.snackBar.open(
        'Device is not online, information may be not accurate',
        '', { duration: 5000 },
      );
    }
    this.runningApplets = this.fetchUserApplets(this.device.runningApplets);
    this.scheduledApplets = this.fetchUserApplets(this.device.scheduledApplets);

    this.scheduledApplets = _.filter(this.scheduledApplets, (sa) => {
      return _.find(this.runningApplets, (ra) => {
        return ra.image.packageName === sa.image.packageName;
      }) == null;
    });
  }

  private fetchUserApplets(images: AppletImage[]): UserAppletInfo[] {
    return _.chain(images)
      .map((image) => {
        const userApplet = _.find(this.userApplets, (ua) => (
          image.packageName === ua.config.appletConfig.packageName
        ));
        return {
          image,
          userApplet,
          sameVersion: (
            userApplet &&
            userApplet.config.appletConfig.version === image.version
          ),
        };
      })
      .filter((x) => x != null)
      .value();
  }

  ngOnInit() {
  }
}

export interface UserAppletInfo {
  userApplet:     UserApplet;
  image:          AppletImage;
  sameVersion:    boolean;
}
