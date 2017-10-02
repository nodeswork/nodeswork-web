import { Injectable }               from '@angular/core';

import { Account, AccountCategory } from '../../_models';
import { ApiClientService }         from '../utils/api-client.service';

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

  async verify(accountId: string): Promise<any> {
    return await this.api.post(`/v1/u/accounts/${accountId}/verify`, {});
  }

  async updateAccountInfoFromRemote(accountId: string): Promise<Account> {
    return await this.api.post(
      `/v1/u/accounts/${accountId}/update-account-info`, {},
    );
  }
}
