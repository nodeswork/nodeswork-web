import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  create(user: { email: string, password: string }) {
    return this.http.post(environment.apiHost + '/v1/u/user/register', user);
  }
}
