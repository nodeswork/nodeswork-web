import { Component, OnInit  }       from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
}                                   from '@angular/forms';

import { Account, AccountCategory } from '../../_models';
import { AccountsService }          from '../../_services';

@Component({
  selector: 'app-account-edit-form',
  templateUrl: './account-edit-form.component.html',
  styleUrls: ['./account-edit-form.component.css']
})
export class AccountEditFormComponent implements OnInit {

  rForm:            FormGroup;
  account:          Account;
  accountCategory:  AccountCategory;

  constructor(
    private fb:               FormBuilder,
    private accountsService:  AccountsService,
    private router:           Router,
    private route:            ActivatedRoute,
  ) {
    this.route.params.subscribe(async (params) => {
      const accountId: string = params.accountId;
      this.account = await this.accountsService.get(accountId);
      this.accountCategory = this.account.accountCategory;
      this.init();
    });
  }

  init() {
    const fbConfigs: any = {
      name: [this.account.name, Validators.required],
    };
    switch (this.accountCategory.accountType) {
      case 'WEXAccount':
        fbConfigs.key     = [ this.account.key, Validators.required ];
        fbConfigs.secret  = [ this.account.secret, Validators.required ];
        break;
    }

    this.rForm = this.fb.group(fbConfigs);
  }

  ngOnInit() {
  }

  async save() {
    if (!this.rForm.valid) {
      return;
    }

    const update: any = this.rForm.value;
    update.accountType = this.account.accountType;

    this.account = await this.accountsService.update(
      this.account._id.toString(), update,
    );
    this.init();
  }

  async verify() {
    switch (this.accountCategory.accountType) {
      case 'WEXAccount':
        try {
          this.account = await this.accountsService.verify(
            this.account._id.toString(), {}, { blocking: true },
          );
        } catch (e) {
          switch (e.error.message) {
            case 'invalid api key':
              this.rForm.controls.key.setErrors({ invalid: true });
              this.rForm.controls.key.markAsTouched();
              break;
            case 'invalid signature':
              this.rForm.controls.secret.setErrors({ invalid: true });
              this.rForm.controls.secret.markAsTouched();
              break;
            default:
              throw e;
          }
        }
    }
  }
}
