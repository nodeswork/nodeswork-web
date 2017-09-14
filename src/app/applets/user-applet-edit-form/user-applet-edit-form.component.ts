import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder, FormGroup,
  FormControl, Validators,
}                                   from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';

import {
  Device,
  UserApplet,
}                                   from '../../_models';
import {
  DevicesService,
  UserAppletsService,
}                                   from '../../_services';

@Component({
  selector: 'app-user-applet-edit-form',
  templateUrl: './user-applet-edit-form.component.html',
  styleUrls: ['./user-applet-edit-form.component.css']
})
export class UserAppletEditFormComponent implements OnInit {

  rForm:                FormGroup;
  @Input() userApplet:  UserApplet;
  devices:              Device[];

  constructor(
    private fb:                  FormBuilder,
    private route:               ActivatedRoute,
    private userAppletsService:  UserAppletsService,
    private devicesService:      DevicesService,
  ) {
    this.rForm = fb.group({
      device: '',
      enabled: false,
    });
    this.devicesService.myDevices().subscribe((devices) => {
      this.devices = devices;
    });
    this.route.params.subscribe(async (params) => {
      if (this.userApplet == null ||
        this.userApplet._id !== params.userAppletId) {
        const userApplet = (
          await this.userAppletsService.get(params.userAppletId)
        );
        this.userApplet = userApplet;
        this.rForm.controls.enabled.setValue(this.userApplet.enabled);
        if (userApplet.config.devices.length === 0 && this.devices.length > 0) {
          this.userApplet.config.devices.push({
            device: this.devices[0]._id,
          });
          this.rForm.markAsDirty();
        }
        if (userApplet.config.devices[0]) {
          this.rForm.controls.device.setValue(
            userApplet.config.devices[0].device,
          );
        }
      }
    });
  }

  ngOnInit() {
  }

  async save() {
    this.userApplet.config.devices[0].device = this.rForm.value.device;
    this.userApplet.enabled = this.rForm.value.enabled;
    const userApplet = await this.userAppletsService.update(
      this.userApplet._id,
      {
        config: this.userApplet.config,
        enabled: this.userApplet.enabled,
      } as UserApplet,
    );
    this.rForm.markAsPristine();
  }
}
