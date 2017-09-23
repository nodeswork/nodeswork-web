import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Account, AccountCategory } from '../../_models';
import { AccountsService }          from '../../_services';

@Component({
  selector: 'app-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.css']
})
export class AccountCreateFormComponent implements OnInit {

  public accountCategories: AccountCategory[] = [ ];

  constructor(
    private accountsService: AccountsService,
    private router: Router,
  ) {
    this.accountsService.accountCategories()
      .then((accountCategories) => {
        this.accountCategories = accountCategories;
      })
    ;
  }

  ngOnInit() {
  }

  async createCommon(accountCategory: AccountCategory) {
    let account: Account = {
      accountType: accountCategory.accountType,
      provider: accountCategory.provider,
      name: accountCategory.name,
    } as any;
    account = await this.accountsService.create(account);
    this.router.navigate([`/accounts/${account._id}/oauth-account-verify`]);
  }
}
