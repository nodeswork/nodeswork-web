import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Account }           from '../../_models';
import { AccountsService }   from '../../_services';

@Component({
  selector: 'app-oauth-account-verify',
  templateUrl: './oauth-account-verify.component.html',
  styleUrls: ['./oauth-account-verify.component.css']
})
export class OauthAccountVerifyComponent implements OnInit {

  public account: Account;

  constructor(
    private route:            ActivatedRoute,
    private accountsService:  AccountsService,
  ) {
    this.route.params.subscribe(async (params) => {
      this.account = await this.accountsService.get(params.accountId);
    });
  }

  ngOnInit() {
  }

  async verify() {
    const resp = await this.accountsService.verify(this.account._id);
    if (resp.redirectTo) {
      window.open(resp.redirectTo);
    }
    console.log(this.account);
    console.log(resp);
  }
}
