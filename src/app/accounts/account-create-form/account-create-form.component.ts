import { Component, OnInit }        from '@angular/core';

import { Account, AccountCategory } from '../../_models';
import { AccountsService }          from '../../_services';

@Component({
  selector: 'app-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.css']
})
export class AccountCreateFormComponent implements OnInit {

  public accountCategories: AccountCategory[] = [
    {
      accountType: 'OAuthAccount',
      provider:    'twitter',
      name:        'Twitter',
      imageUrl:    'https://www.seeklogo.net/wp-content/uploads/2016/11/twitter-icon-circle-blue-logo-preview.png',
    },
  ];

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
  }

  async createCommon(accountCategory: AccountCategory) {
    let account: Account = {
      accountType: accountCategory.accountType,
      provider: accountCategory.provider,
      name: accountCategory.name,
    } as any;
    account = await this.accountsService.create(account);
    console.log(accountCategory, account);
  }
}
