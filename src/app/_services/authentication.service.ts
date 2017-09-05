import 'rxjs/add/operator/toPromise';

import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  async login(email: string, password: string) {
    const userInfo = { email, password };
    try {
      const user = await this.http.post(
        environment.apiHost + '/v1/u/user/login', userInfo
      ).toPromise();
      // localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (err) {
      throw err;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
