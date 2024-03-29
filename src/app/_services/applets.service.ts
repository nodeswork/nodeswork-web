import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';

import {
  Applet,
  AppletProvider,
  RouteOptions,
}                           from '../_models';
import { ApiClientService } from './utils/api-client.service';

@Injectable()
export class AppletsService {

  constructor(
    private http: HttpClient,
    private apiClient: ApiClientService,
  ) { }

  async create(applet: Applet) {
    try {
      const result = await this.apiClient.post(
        '/v1/u/applets', applet,
      );
    } catch (err) {
      throw err;
    }
  }

  async get(appletId: string): Promise<Applet> {
    try {
      const result = await this.apiClient.get(
        '/v1/u/applets/' + appletId,
      );
      return result as Applet;
    } catch (err) {
      throw err;
    }
  }

  async update(appletId: string, applet: Applet): Promise<Applet> {
    try {
      const result = await this.apiClient.post(
        '/v1/u/applets/' + appletId, applet,
      );
      return result as Applet;
    } catch (err) {
      throw err;
    }
  }

  async find(): Promise<Applet[]> {
    try {
      const result = await this.apiClient.get(
        '/v1/u/applets/',
      );
      return result as Applet[];
    } catch (err) {
      throw err;
    }
  }

  async explore(): Promise<Applet[]> {
    return await this.apiClient.get('/v1/u/explore');
  }

  async getAppletStructure(options: RouteOptions): Promise<{ providers: AppletProvider[]}> {
    try {
      const path = [
        options.appletId, options.naType, options.naVersion,
        options.packageName, options.version,
      ].join('/');

      return (await this.http.get(
        `http://localhost:28310/applets/${path}/sstruct`,
      ).toPromise()) as any;
    } catch (err) {
      throw err;
    }
  }
}
