import 'rxjs/add/operator/toPromise';

import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiClientService {

  constructor(private http: HttpClient) { }

  async get(path: string): Promise<any> {
    return await this.http.get(
      environment.apiHost + path,
    ).toPromise();
  }

  async post(path: string, body: any): Promise<any> {
    return await this.http.post(
      environment.apiHost + path, body,
    ).toPromise();
  }
}
