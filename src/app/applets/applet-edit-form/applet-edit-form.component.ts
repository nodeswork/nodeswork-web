import * as _                     from 'underscore';
import { Component, OnInit }      from '@angular/core';
import {
  FormBuilder, FormGroup,
  FormControl, Validators,
}                                 from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppletsService }         from '../../_services';
import { Applet }                 from '../../_models';

@Component({
  selector: 'app-applet-edit-form',
  templateUrl: './applet-edit-form.component.html',
  styleUrls: ['./applet-edit-form.component.css']
})
export class AppletEditFormComponent implements OnInit {

  rForm:      FormGroup;
  isEditing:  boolean;
  title:      string;
  applet:     Applet;

  step = 0;

  constructor(
    private fb:              FormBuilder,
    private route:           ActivatedRoute,
    private appletsService:  AppletsService,
  ) {
    this.rForm = fb.group({
      name:             ['', Validators.required],
      description:      '',
      config:           this.fb.group({
        _id:            undefined,
        packageName:    ['', Validators.required],
        version:        ['0', Validators.required],
        workers:        undefined,
        naType:         undefined,
        naVersion:      undefined,
      }),
      permission:       ['PRIVATE', Validators.required],
    });

    this.route.params.subscribe(async (params) => {
      this.isEditing = params.appletId != null;
      this.title = this.isEditing ? 'Edit My Applet' : 'Create a New Applet';

      if (params.appletId != null) {
        this.applet = await this.appletsService.get(params.appletId);
        this.rForm.setValue(
          _.omit(this.applet, '_id', 'owner', 'configHistories', 'createdAt', 'lastUpdateTime', 'imageUrl', 'tokens', 'deleted'),
          {onlySelf: true},
        );
      }
    });
  }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  async save() {
    if (!this.rForm.valid) {
      if (this.rForm.controls.name.invalid) {
        this.step = 0;
      } else if (this.rForm.controls.config.invalid) {
        this.step = 1;
      }
      return;
    }

    if (this.applet == null) {
      try {
        const applet = this.rForm.value;
        applet.config = _.pick(applet.config, 'packageName', 'version');
        await this.appletsService.create(applet);
        this.rForm.markAsPristine();
      } catch (e) {
        switch (e.error && e.error.message) {
          case 'duplicate record':
            this.rForm.controls.name.setErrors({ duplicate: true });
            break;
          default:
            console.error(e);
        }
      }
    } else {
      try {
        await this.appletsService.update(this.applet._id, this.rForm.value);
        this.rForm.markAsPristine();
      } catch (e) {
        switch (e.error && e.error.message) {
          default:
            console.error(e);
        }
      }
    }
  }
}
