import { Component, OnInit, Input } from '@angular/core';
import { Router }                   from '@angular/router';

import { Account }                  from '../../_models';
import { AccountsService }          from '../../_services';

@Component({
  selector: 'app-account-entry',
  templateUrl: './account-entry.component.html',
  styleUrls: ['./account-entry.component.css']
})
export class AccountEntryComponent implements OnInit {

  @Input() account: Account;

  constructor(
    private router:           Router,
    private accountsService:  AccountsService,
  ) { }

  ngOnInit() {
  }

  async onClick() {
    if (!this.account.verified && this.account.accountType === 'OAuthAccount') {
      this.router.navigate(
        [`/accounts/${this.account._id}/oauth-account-verify`],
      );
    } else if (this.account.verified) {
      this.account = await this.accountsService.updateAccountInfoFromRemote(
        this.account._id,
      );
    }
  }
}
