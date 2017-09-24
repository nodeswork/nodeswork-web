import * as _                       from 'underscore';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder, FormGroup,
  FormControl, Validators,
}                                   from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';

import {
  Account,
  Device,
  UserApplet,
}                                   from '../../_models';
import {
  AccountsService,
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
  public accounts:      AccountSelect[] = [];

  constructor(
    private fb:                  FormBuilder,
    private route:               ActivatedRoute,
    private userAppletsService:  UserAppletsService,
    private devicesService:      DevicesService,
    private accountsService:     AccountsService,
  ) {
    this.rForm = fb.group({
      device: '',
      enabled: false,
    });
    this.devicesService.myDevices().subscribe((devices) => {
      this.devices = devices;
    });
    this.init();
  }

  private async init() {
    const accounts = await this.accountsService.find();
    this.accounts = _
      .chain(accounts)
      .filter((a) => a.verified)
      .map((a) => {
        return {
          account: a,
          selected: false,
        };
      })
      .value();

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
        if (userApplet.config.accounts) {
          for (const account of userApplet.config.accounts) {
            const t = _.find(
              this.accounts,
              (a) => a.account._id === account.account,
            );
            if (t != null) {
              t.selected = true;
            }
          }
        }
      }
    });
  }

  ngOnInit() {
  }

  toggleAccount(account: AccountSelect) {
    account.selected = !account.selected;
    this.rForm.markAsDirty();
  }

  async save() {
    const accountConfigs = _
      .chain(this.accounts)
      .filter((a) => a.selected)
      .map((a) => {
        return { account: a.account._id };
      })
      .value();
    this.userApplet.config.accounts = accountConfigs;

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

export interface AccountSelect {
  account:   Account;
  selected:  boolean;
}
