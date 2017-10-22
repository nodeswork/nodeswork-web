import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { UserStateService } from '../users/user-state.service';
import { ApiClientService } from '../utils/api-client.service';
import {
  AppletWorkerConfig,
  UserApplet, User, Applet,
}                           from '../../_models';

@Injectable()
export class UserAppletsService {

  private user: User;
  private userApplets = new BehaviorSubject<UserApplet[]>([]);

  constructor(
    private userState: UserStateService,
    private apiClient: ApiClientService,
  ) {
    this.refreshMyApplets();
  }

  myApplets(): Observable<UserApplet[]> {
    return this.userApplets.asObservable();
  }

  async install(applet: Applet): Promise<UserApplet> {
    try {
      const result = await this.apiClient
        .post('/v1/u/my-applets', {
          applet: applet._id,
          config: {
            appletConfig: applet.config._id,
            devices:      [],
          }
        });
      this.refreshMyApplets();
      return result as UserApplet;
    } catch (e) {
      /* handle error */
      console.error(e);
    }
  }

  async get(userAppletId: string): Promise<UserApplet> {
    try {
      const result = await this.apiClient.get(
        `/v1/u/my-applets/${userAppletId}`,
      );
      return result as UserApplet;
    } catch (e) {
      /* handle error */
      console.error(e);
    }
  }

  async update(
    userAppletId: string, userApplet: UserApplet
  ): Promise<UserApplet> {
    try {
      const result = await this.apiClient.post(
        '/v1/u/my-applets/' + userAppletId, userApplet,
      );
      return result as UserApplet;
    } catch (e) {
      /* handle error */
      console.error(e);
    }
  }

  async delete(userAppletId: string): Promise<void> {
    try {
      await this.apiClient.delete(
        '/v1/u/my-applets/' + userAppletId
      );
    } catch (e) {
      /* handle error */
      console.error(e);
    }
  }

  async work(userAppletId: string, worker: AppletWorkerConfig): Promise<any> {
    return await this.apiClient.post(
      `/v1/u/my-applets/${userAppletId}/work/${worker.handler}/${worker.name}`,
      {},
    );
  }

  async routeGet(userAppletId: string, path: string): Promise<any> {
    return await this.apiClient.get(
      `/v1/u/my-applets/${userAppletId}/route/${path}`,
    );
  }

  refreshMyApplets() {
    this.userState.current().subscribe(async (user) => {
      this.user = user;
      if (user == null) {
        this.userApplets.next([]);
        return;
      }
      try {
        const result = await this.apiClient.get('/v1/u/my-applets');
        this.userApplets.next(result as UserApplet[]);
      } catch (e) {
        /* handle error */
        console.error(e);
      }
    });
  }
}
