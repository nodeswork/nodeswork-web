import * as _                     from 'underscore';
import { Component, OnInit }      from '@angular/core';
import {
  FormArray,
  FormBuilder, FormGroup,
  FormControl, Validators,
}                                 from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AppletsService,
  AccountsService,
}                                 from '../../_services';
import {
  Applet,
  AccountCategory,
  AppletAccountConfig,
  AppletProvider,
}                                 from '../../_models';

interface AccountCategorySelect {
  category: AccountCategory;
  selected: boolean;
  multiple: boolean;
  optional: boolean;
}

@Component({
  selector: 'app-applet-edit-form',
  templateUrl: './applet-edit-form.component.html',
  styleUrls: ['./applet-edit-form.component.css']
})
export class AppletEditFormComponent implements OnInit {

  rForm:              FormGroup;
  isEditing:          boolean;
  title:              string;
  applet:             Applet;
  accountCategories:  AccountCategorySelect[] = [];
  providers:          AppletProvider[] = [];

  step = 0;

  constructor(
    private fb:              FormBuilder,
    private route:           ActivatedRoute,
    private appletsService:  AppletsService,
    private accountsService: AccountsService,
  ) {
    this.rForm = fb.group({
      name:             ['', Validators.required],
      description:      '',
      config:           this.fb.group({
        _id:            undefined,
        packageName:    ['', Validators.required],
        version:        ['0', Validators.required],
        workers:        [],
        accounts:       [],
        naType:         'npm',
        naVersion:      '8.3.0',
      }),
      permission:       ['PRIVATE', Validators.required],
    });
    this.init();
  }

  async init() {
    const accountCategories = await this.accountsService.accountCategories();
    this.route.params.subscribe(async (params) => {
      this.isEditing = params.appletId != null;
      this.title = this.isEditing ? 'Edit Applet' : 'New Applet';

      if (params.appletId != null) {
        this.applet = await this.appletsService.get(params.appletId);
        const formValue = _.omit(
          this.applet,
          '_id', 'owner', 'configHistories', 'createdAt', 'lastUpdateTime',
          'imageUrl', 'tokens', 'deleted',
        );
        this.rForm.setValue(formValue, {onlySelf: true});

        this.accountCategories = _.map(accountCategories, (category) => {
          const account = _.find(this.applet.config.accounts, (a) => {
            return (
              a.accountType === category.accountType &&
              a.provider === category.provider
            );
          });

          return {
            category,
            selected: account != null,
            optional: account && account.optional || false,
            multiple: account && account.multiple || false,
          };
        });

        try {
          const resp = await this.appletsService.getAppletStructure(
            this.applet.config.packageName,  this.applet.config.version,
          );
          this.providers = resp.providers;
          console.log(this.providers);

          const w = _.filter(this.providers, (p) => {
            return p.tags.indexOf('worker') >= 0;
          });
          const workers = _.chain(w)
            .map((x) => x.meta.endpoints)
            .flatten()
            .map((x) => `${x.handler}.${x.name}`)
            .union()
            .map((name) => {
              return { name, schedule: null };
            })
            .value();
          this.applet.config.workers = workers;
          console.log(workers);

        } catch (e) {
          if (e.status === 404) {
          }
        }
      }
    });
  }

  toggleAccountCategory(c: AccountCategorySelect) {
    c.selected = !c.selected;
    this.rForm.markAsDirty();
  }

  toggleAccountCategoryOptional(c: AccountCategorySelect) {
    c.optional = !c.optional;
    this.rForm.markAsDirty();
  }

  toggleAccountCategoryMultiple(c: AccountCategorySelect) {
    c.multiple = !c.multiple;
    this.rForm.markAsDirty();
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

    const accounts: AppletAccountConfig[] = _
      .chain(this.accountCategories)
      .filter((c) => c.selected)
      .map((c) => {
        return {
          accountType: c.category.accountType,
          provider: c.category.provider,
          optional: c.optional,
          multiple: c.multiple,
        };
      })
      .value()
    ;

    if (this.applet == null) {
      try {
        const applet = this.rForm.value;
        applet.config = _.pick(applet.config, 'packageName', 'version');
        applet.config.accounts = accounts;
        applet.config.workers  = this.applet.config.workers;
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
        const applet = this.rForm.value;
        applet.config.accounts = accounts;
        applet.config.workers  = this.applet.config.workers;
        await this.appletsService.update(this.applet._id, applet);
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
