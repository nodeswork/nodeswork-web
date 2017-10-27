import * as _                             from 'underscore';
import { Component, OnInit }              from '@angular/core';
import { Router }                         from '@angular/router';
import { MatDialog }                      from '@angular/material';

import { Account, AccountCategory }       from '../../_models';
import { AccountsService }                from '../../_services';
import { ConfirmDialogComponent }         from '../../utils';
import { FifaFut18CreateDialogComponent } from '../fifa-fut-18-create-dialog/fifa-fut-18-create-dialog.component';
import { WexCreateDialogComponent }       from '../wex-create-dialog/wex-create-dialog.component';

@Component({
  selector: 'app-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.css']
})
export class AccountCreateFormComponent implements OnInit {

  public accountCategories: AccountCategory[] = [];
  public accounts: Account[] = [];

  constructor(
    private accountsService:  AccountsService,
    private router:           Router,
    private dialog:           MatDialog,
  ) {
    this.accountsService.accountCategories()
      .then((accountCategories) => {
        this.accountCategories = accountCategories;
      })
    ;
    this.accountsService.find().then((accounts) => {
      this.accounts = accounts;
    });
  }

  ngOnInit() {
  }

  async createOAuthAccount(accountCategory: AccountCategory) {
    let account: Account = {
      accountType: accountCategory.accountType,
      provider: accountCategory.provider,
      name: accountCategory.name,
    } as any;
    account = await this.accountsService.create(account);
    this.router.navigate([`/accounts/${account._id}/oauth-account-verify`]);
  }

  async createFifaFut18Account(
    accountCategory: AccountCategory, email: string,
  ) {
    let account: Account = {
      accountType: accountCategory.accountType,
      provider: accountCategory.provider,
      name: email,
      email,
    } as any;
    account = await this.accountsService.create(account);
    this.router.navigate([`/accounts/${account._id}/fifa-fut-18-account-verify`]);
  }

  async createWEXAccount(accountCategory: AccountCategory, info: {
    name: string; key: string; secret: string;
  }) {
    let account: Account = {
      accountType:  accountCategory.accountType,
      provider:     accountCategory.provider,
      name:         info.name,
      key:          info.key,
      secret:       info.secret,
    } as any;
    account = await this.accountsService.create(account);
    this.router.navigate([`/accounts/${account._id}/edit`]);
  }

  async createCommon(accountCategory: AccountCategory) {
    switch (accountCategory.accountType) {
      case 'OAuthAccount':
        const existing = _.find(this.accounts, (account) => {
          return account.accountCategory.accountType ===
            accountCategory.accountType &&
            account.accountCategory.provider ===
            accountCategory.provider;
        });

        if (existing == null) {
          await this.createOAuthAccount(accountCategory);
        } else {
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              content: `You already have an account from ${accountCategory.name}, do you want to create another one?`,
            },
          }).afterClosed().subscribe((res) => {
            if (res) {
              this.createOAuthAccount(accountCategory);
            }
          });
        }
        break;
      case 'FifaFut18Account':
        this.dialog
          .open(FifaFut18CreateDialogComponent)
          .afterClosed().subscribe((email) => {
            if (email) {
              this.createFifaFut18Account(accountCategory, email);
            }
          })
        ;
        break;
      case 'WEXAccount':
      case 'KrakenAccount':
        this.dialog
          .open(WexCreateDialogComponent, {
            data: {
              accountCategory,
            },
          })
          .afterClosed().subscribe((account) => {
            if (account) {
              this.createWEXAccount(accountCategory, account);
            }
          })
        ;
    }
  }
}
