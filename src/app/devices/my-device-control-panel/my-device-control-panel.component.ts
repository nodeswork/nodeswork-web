import * as _                from 'underscore';
import { Component, OnInit } from '@angular/core';

import { DevicesService }    from '../../_services';
import { Device }            from '../../_models';

@Component({
  selector: 'app-my-device-control-panel',
  templateUrl: './my-device-control-panel.component.html',
  styleUrls: ['./my-device-control-panel.component.css']
})
export class MyDeviceControlPanelComponent implements OnInit {

  myDevices: Device[] = [];
  connected: number;

  constructor(
    private devicesService: DevicesService,
  ) {
    this.devicesService.myDevices().subscribe((devices) => {
      if (devices != null) {
        this.myDevices = devices;
        this.connected = _.filter(devices, _.property('online')).length;
      }
    });
  }

  ngOnInit() {
  }

}
