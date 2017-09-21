import { Component, OnInit, Input } from '@angular/core';

import { AccountCategory }   from '../../_models';

@Component({
  selector: 'app-account-type-entry',
  templateUrl: './account-type-entry.component.html',
  styleUrls: ['./account-type-entry.component.css']
})
export class AccountTypeEntryComponent implements OnInit {

  @Input() accountCategory: AccountCategory;

  constructor() { }

  ngOnInit() {
  }

}
