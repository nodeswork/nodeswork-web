import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { environment }      from '../../../environments/environment';
import { UserStateService } from '../users/user-state.service';
import {
  UserApplet, User, Applet,
}                           from '../../_models';

@Injectable()
export class UserAppletsService {

  private user: User;
  private userApplets = new BehaviorSubject<UserApplet[]>([]);

  constructor(
    private userState: UserStateService,
    private http: HttpClient,
  ) {
    this.refreshMyApplets();
  }

  myApplets(): Observable<UserApplet[]> {
    return this.userApplets.asObservable();
  }

  async install(applet: Applet): Promise<UserApplet> {
    try {
      const result = await this.http
        .post(environment.apiHost + '/v1/u/my-applets', {
          applet: applet._id,
          config: {
            appletConfig: applet.config._id,
            devices:      [],
          }
        })
        .toPromise();
      this.refreshMyApplets();
      return result as UserApplet;
    } catch (e) {
      /* handle error */
      console.error(e);
    }
  }

  refreshMyApplets() {
    this.userState.current().subscribe(async (user) => {
      this.user = user;
      if (user == null) {
        this.userApplets.next([]);
        return;
      }
      try {
        const result = await this.http
          .get(environment.apiHost + '/v1/u/my-applets')
          .toPromise();
        this.userApplets.next(result as UserApplet[]);
      } catch (e) {
        /* handle error */
        console.error(e);
      }
    });
  }
}
