import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { environment }      from '../../../environments/environment';
import { UserStateService } from '../';
import { UserApplet }       from '../../_models';

@Injectable()
export class UserAppletsService {

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

  refreshMyApplets() {
    this.userState.current().subscribe(async (user) => {
      if (user == null) {
        this.userApplets.next([]);
        return;
      }
      try {
        const result = await this.http.get(environment.apiHost + '/v1/u/my-applets')
          .toPromise();
        this.userApplets.next(result as UserApplet[]);
      } catch (e) {
        /* handle error */
        console.error(e);
      }
    });
  }
}
