import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { User }       from '../../_models';

@Injectable()
export class UserStateService {

  private user = new BehaviorSubject<User>(null);

  constructor() {
    const dataStr = localStorage.getItem('currentUser');
    if (dataStr != null) {
      this.user.next(JSON.parse(dataStr));
    }
  }

  current(): Observable<User> {
    return this.user.asObservable();
  }

  set(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user.next(user);
  }

  remove() {
    localStorage.removeItem('currentUser');
    this.user.next(null);
  }
}
