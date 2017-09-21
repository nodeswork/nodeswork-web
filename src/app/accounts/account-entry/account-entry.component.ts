import { Component, OnInit, Input } from '@angular/core';

import { Account }                  from '../../_models';

@Component({
  selector: 'app-account-entry',
  templateUrl: './account-entry.component.html',
  styleUrls: ['./account-entry.component.css']
})
export class AccountEntryComponent implements OnInit {

  @Input() account: Account;

  constructor() { }

  ngOnInit() {
  }

}
