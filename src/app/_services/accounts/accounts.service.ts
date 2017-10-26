import { Injectable }               from '@angular/core';

import { Account, AccountCategory } from '../../_models';
import {
  ApiClientService,
  ApiClientRequestOptions,
}                                   from '../utils/api-client.service';

@Injectable()
export class AccountsService {

  constructor(private api: ApiClientService) { }

  async accountCategories(): Promise<AccountCategory[]> {
    return await this.api.get('/v1/resources/account-categories');
  }

  async create(account: Account): Promise<Account> {
    return await this.api.post('/v1/u/accounts', account);
  }

  async find(): Promise<Account[]> {
    return await this.api.get('/v1/u/accounts');
  }

  async get(accountId: string): Promise<Account> {
    return await this.api.get('/v1/u/accounts/' + accountId);
  }

  async verify(
    accountId: string, body: any = {}, options?: ApiClientRequestOptions,
  ): Promise<any> {
    return await this.api.post(
      `/v1/u/accounts/${accountId}/verify`, body, options,
    );
  }

  async update(accountId: string, doc: any = {}): Promise<Account> {
    return await this.api.post(
      `/v1/u/accounts/${accountId}`, doc,
    );
  }

  async updateAccountInfoFromRemote(accountId: string): Promise<Account> {
    return await this.api.post(
      `/v1/u/accounts/${accountId}/update-account-info`, {},
    );
  }
}
