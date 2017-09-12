import 'rxjs/add/operator/toPromise';

import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Applet }      from '../_models';

@Injectable()
export class AppletsService {

  constructor(private http: HttpClient) { }

  async create(applet: Applet) {
    try {
      const result = await this.http.post(
        environment.apiHost + '/v1/u/applets', applet,
      ).toPromise();
    } catch (err) {
      throw err;
    }
  }
}
