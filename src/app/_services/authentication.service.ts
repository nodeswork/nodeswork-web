import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';

import { User }             from '../_models';
import { environment }      from '../../environments/environment';
import { UserStateService } from './users';
import { ApiClientService } from './utils/api-client.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private apiClient: ApiClientService,
    private userState: UserStateService,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const userInfo = { email, password };
    const user: User = await this.apiClient.post(
      '/v1/u/user/login', userInfo,
    );
    this.userState.set(user);
    return user;
  }

  async logout() {
    await this.apiClient.get('/v1/u/user/logout');
    this.userState.remove();
  }
}
