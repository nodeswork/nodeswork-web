import * as _                     from 'underscore';
import { Component, OnInit }      from '@angular/core';
import { MatSnackBar }            from '@angular/material';
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
  AppletImage,
  AccountCategory,
  AppletAccountConfig,
  AppletWorkerConfig,
  AppletProvider,
  InputMetadata,
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

  rForm:                   FormGroup;
  isEditing:               boolean;
  title:                   string;
  applet:                  Applet;

  accountCategories:       AccountCategory[] = [];
  accountCategorySelects:  AccountCategorySelect[] = [];

  workers:                 AppletWorkerConfig[];

  localApplet:             string;
  localAppletStruct:       object;
  lastCheckedApplet:       AppletImage;

  showEditor:              boolean;

  step = 0;

  constructor(
    private fb:               FormBuilder,
    private route:            ActivatedRoute,
    private appletsService:   AppletsService,
    private accountsService:  AccountsService,
    private snackBar:         MatSnackBar,
  ) {
    this.rForm = fb.group({
      name:         ['', Validators.required],
      description:  '',
      packageName:  ['', Validators.required],
      version:      ['', Validators.required],
      permission:   ['PRIVATE', Validators.required],
      sstruct:      '{}',
    });

    this.route.params.subscribe(async (params) => {
      this.isEditing          = params.appletId != null;
      this.title              = this.isEditing ? 'Edit Applet' : 'New Applet';
      this.accountCategories  = await this.accountsService.accountCategories();

      this.applet = params.appletId != null ?
        await this.appletsService.get(params.appletId) : {
          name:           '',
          description:    '',
          imageUrl:       undefined,
          permission:     'PRIVATE',
          config:         {
            naType:       'npm',
            naVersion:    '8.7.0',
            packageName:  '',
            version:      '',
            workers:      [],
            accounts:     [],
          },
        };

      await this.loadFromApplet();
    });
  }

  async loadFromApplet() {
    this.rForm.setValue({
      name:         this.applet.name,
      description:  this.applet.description,
      packageName:  this.applet.config.packageName,
      version:      this.applet.config.version,
      permission:   this.applet.permission,
      sstruct:      '{}',
    });
    this.workers   = this.applet.config.workers;
    this.accountCategorySelects = _.map(
      this.applet.config.accounts, (account) => {
        const accountCategory = this.findAccountCategory(account);
        return {
          category: accountCategory,
          selected: true,
          multiple: account.multiple,
          optional: account.optional,
        };
      },
    );
  }

  private findAccountCategory(c: { accountType: string; provider: string; }) {
    return _.find(
      this.accountCategories,
      (e) => c.accountType === e.accountType && c.provider === e.provider,
    );
  }

  async fetchAppletStructure() {
    const formValue       = this.rForm.value;

    if (!formValue.packageName || !formValue.version) {
      this.step = 2;
      return;
    }

    try {
      this.localAppletStruct = await this.appletsService.getAppletStructure({
        appletId:     this.applet._id || 'unknown',
        naType:       this.applet.config.naType,
        naVersion:    this.applet.config.naVersion,
        packageName:  formValue.packageName,
        version:      formValue.version,
      });
      this.localApplet = 'running';
    } catch (e) {
      this.localApplet = 'not_detected';
    }
  }

  async pullLocalAppletStructure() {
    await this.fetchAppletStructure();
    const sstruct = JSON.stringify(this.localAppletStruct, null, 2);
    this.rForm.controls.sstruct.setValue(sstruct);
    this.updateWithStructure();
  }

  async updateWithStructure() {
    const sstruct = JSON.parse(this.rForm.controls.sstruct.value);

    const workers = _.chain(sstruct.providers)
      .filter((p: AppletProvider) => {
        return p.tags.indexOf('worker') >= 0;
      })
      .map((x) => x.meta.endpoints)
      .flatten()
      .map((x) => {
        const meta = x.meta;
        if (meta == null) {
          return {
            handler:      x.handler,
            name:         x.name,
            displayName:  `${x.handler}.${x.name}`,
            schedule:     null,
            default:      false,
            hide:         false,
          };
        } else {
          return {
            handler:      x.handler,
            name:         x.name,
            displayName:  meta.name || `${x.handler}.${x.name}`,
            schedule:     meta.schedule || null,
            default:      meta.default || false,
            hide:         meta.hide || false,
          };
        }
      })
      .value();

    const selects = _
      .chain(sstruct.providers)
      .filter((p: AppletProvider) => {
        return p.tags.indexOf('account') >= 0;
      })
      .map((provider: AppletProvider) => {
        const accountCategory = this.findAccountCategory(provider.meta as any);
        const existingSelect = _.find(this.accountCategorySelects, (s) => {
          return s.category.accountType === provider.meta.accountType &&
            s.category.provider === provider.meta.provider;
        });
        return existingSelect != null ? existingSelect : {
          category: accountCategory,
          selected: true,
          multiple: false,
          optional: false,
        };
      })
      .filter((x) => x.category != null)
      .value()
    ;
    this.workers                = workers;
    this.accountCategorySelects = selects;
    this.rForm.markAsDirty();
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
      } else if (this.rForm.controls.packageName.invalid ||
        this.rForm.controls.version.invalid
      ) {
        this.step = 1;
      }
      return;
    }

    const accounts: AppletAccountConfig[] = _
      .chain(this.accountCategorySelects)
      .filter((c) => c.selected)
      .map((c) => {
        return {
          accountType:  c.category.accountType,
          provider:     c.category.provider,
          optional:     c.optional,
          multiple:     c.multiple,
        };
      })
      .value()
    ;

    this.applet.name                = this.rForm.controls.name.value;
    this.applet.description         = this.rForm.controls.description.value;
    this.applet.permission          = this.rForm.controls.permission.value;
    this.applet.config.packageName  = this.rForm.controls.packageName.value;
    this.applet.config.version      = this.rForm.controls.version.value;
    this.applet.config.workers      = this.workers;
    this.applet.config.accounts     = accounts;

    if (this.isEditing) {
      try {
        await this.appletsService.update(this.applet._id, this.applet);
        this.rForm.markAsPristine();
      } catch (e) {
        switch (e.error && e.error.message) {
          default:
            console.error(e);
        }
      }
    } else {
      try {
        await this.appletsService.create(this.applet);
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
    }
  }
}
