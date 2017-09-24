import { Component, OnInit, Input } from '@angular/core';

import { Account }                  from '../../_models';
import { AccountsService }          from '../../_services';

@Component({
  selector: 'app-account-entry',
  templateUrl: './account-entry.component.html',
  styleUrls: ['./account-entry.component.css']
})
export class AccountEntryComponent implements OnInit {

  @Input() account: Account;
  @Input() disabled: boolean;

  showCategoryName: boolean;

  constructor(
    private accountsService:  AccountsService,
  ) { }

  ngOnInit() {
    this.fetchName();
  }

  private fetchName() {
    if (this.account != null) {
      this.showCategoryName = (
        this.account.name !== this.account.accountCategory.name
      );
    }
  }
}
