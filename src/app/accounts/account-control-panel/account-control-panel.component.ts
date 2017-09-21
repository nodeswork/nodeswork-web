import { Component, OnInit }        from '@angular/core';

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
    private accountsService: AccountsService,
  ) {
    this.fetchAccounts();
  }

  private async fetchAccounts() {
    this.accounts = await this.accountsService.find();
  }

  ngOnInit() {
  }
}
