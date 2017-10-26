import 'rxjs/add/operator/toPromise';

import { BehaviorSubject }                     from 'rxjs/BehaviorSubject';
import { Observable }                          from 'rxjs/Observable';

import { Injectable }                          from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment }                         from '../../../environments/environment';

export interface ApiClientRequestOptions {
  blocking?: boolean;
}

@Injectable()
export class ApiClientService {

  private blockingStateSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  blockingState(): Observable<boolean> {
    return this.blockingStateSubject.asObservable();
  }

  async get(
    path: string,
    options?: ApiClientRequestOptions,
  ): Promise<any> {
    try {
      if (options && options.blocking) {
        this.blockingStateSubject.next(true);
      }
      return await this.http.get(environment.apiHost + path).toPromise();
    } finally {
      if (options && options.blocking) {
        this.blockingStateSubject.next(false);
      }
    }
  }

  async post(
    path: string, body: any, options?: ApiClientRequestOptions,
  ): Promise<any> {
    try {
      if (options && options.blocking) {
        this.blockingStateSubject.next(true);
      }
      return await this.http.post(environment.apiHost + path, body).toPromise();
    } finally {
      if (options && options.blocking) {
        this.blockingStateSubject.next(false);
      }
    }
  }

  async delete(path: string, options?: ApiClientRequestOptions): Promise<any> {
    try {
      if (options && options.blocking) {
        this.blockingStateSubject.next(true);
      }
      return await this.http.delete(environment.apiHost + path).toPromise();
    } finally {
      if (options && options.blocking) {
        this.blockingStateSubject.next(false);
      }
    }
  }
}
