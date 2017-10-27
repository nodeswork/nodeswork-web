import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Account, AccountCategory } from '../../_models';
import { AccountsService }          from '../../_services';

@Component({
  selector: 'app-account-control-panel',
  templateUrl: './account-control-panel.component.html',
  styleUrls: ['./account-control-panel.component.css']
})
export class AccountControlPanelComponent implements OnInit {

  public accounts: Account[] = [];

  constructor(
    private router:           Router,
    private accountsService:  AccountsService,
  ) {
    this.fetchAccounts();
  }

  private async fetchAccounts() {
    this.accounts = await this.accountsService.find();
  }

  ngOnInit() {
  }

  clickOnAccount(account: Account) {
    if (account.verified) {
      this.router.navigate([`/accounts/${account._id}/edit`]);
      return;
    }

    if (account.accountType === 'OAuthAccount') {
      this.router.navigate(
        [`/accounts/${account._id}/oauth-account-verify`],
      );
    }
    if (account.accountType === 'FifaFut18Account') {
      this.router.navigate(
        [`/accounts/${account._id}/fifa-fut-18-account-verify`],
      );
    }
    if (account.accountType === 'WEXAccount' ||
      account.accountType === 'KrakenAccount'
    ) {
      this.router.navigate([`/accounts/${account._id}/edit`]);
    }
  }
}
