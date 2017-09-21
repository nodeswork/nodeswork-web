import { Injectable }       from '@angular/core';

import { Account }          from '../../_models';
import { ApiClientService } from '../utils/api-client.service';

@Injectable()
export class AccountsService {

  constructor(private api: ApiClientService) { }

  async create(account: Account): Promise<Account> {
    return await this.api.post('/v1/u/accounts', account);
  }
}
