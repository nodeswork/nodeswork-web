import 'rxjs/add/operator/toPromise';

import { Injectable }                          from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment }                         from '../../../environments/environment';

@Injectable()
export class ApiClientService {

  constructor(private http: HttpClient) { }

  async get(
    path: string,
    options?: {
      headers?:          HttpHeaders;
      observe?:          'body';
      params?:           HttpParams;
      reportProgress?:   boolean;
      responseType?:     'json';
      withCredentials?:  boolean;
    },
  ): Promise<any> {
    return await this.http.get(
      environment.apiHost + path, options,
    ).toPromise();
  }

  async post(path: string, body: any): Promise<any> {
    return await this.http.post(
      environment.apiHost + path, body,
    ).toPromise();
  }

  async delete(path: string): Promise<any> {
    return await this.http.delete(
      environment.apiHost + path,
    ).toPromise();
  }
}
