import 'rxjs/add/operator/toPromise';

import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';

import { environment }     from '../../../environments/environment';
import { Device }          from '../../_models';

@Injectable()
export class DevicesService {

  private devices = new BehaviorSubject<Device[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.refreshMyDevices();
  }

  myDevices(): Observable<Device[]> {
    return this.devices.asObservable();
  }

  async refreshMyDevices() {
    try {
      const result = await this.http.get(
        environment.apiHost + '/v1/u/devices',
      ).toPromise();
      this.devices.next(result as Device[]);
    } catch (e) {
      console.error(e);
    }
  }
}
