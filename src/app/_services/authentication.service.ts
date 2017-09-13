import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { Observable }       from 'rxjs/Observable';

import { User }             from '../_models';
import { environment }      from '../../environments/environment';
import { UserStateService } from './users';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private userState: UserStateService,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const userInfo = { email, password };
    try {
      const user: User = await this.http.post(
        environment.apiHost + '/v1/u/user/login', userInfo
      ).toPromise() as any;
      this.userState.set(user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      await this.http.get(
        environment.apiHost + '/v1/u/user/logout'
      ).toPromise();
      this.userState.remove();
    } catch (err) {
      throw err;
    }
  }
}
