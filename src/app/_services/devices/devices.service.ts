import 'rxjs/add/operator/toPromise';

import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { environment }      from '../../../environments/environment';
import { Device }           from '../../_models';
import { ApiClientService } from '../../_services/utils/api-client.service';

@Injectable()
export class DevicesService {

  private devices = new BehaviorSubject<Device[]>([]);

  constructor(
    private apiClient: ApiClientService,
  ) {
    this.refreshMyDevices();
  }

  myDevices(): Observable<Device[]> {
    return this.devices.asObservable();
  }

  async get(deviceId: string): Promise<Device> {
    try {
      const result = await this.apiClient.get(
        `/v1/u/devices/${deviceId}`,
      );
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async refreshMyDevices() {
    try {
      const result = await this.apiClient.get(
        '/v1/u/devices',
      );
      this.devices.next(result as Device[]);
    } catch (e) {
      console.error(e);
    }
  }
}
