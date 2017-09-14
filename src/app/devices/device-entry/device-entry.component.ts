import { Component, OnInit, Input } from '@angular/core';

import { Device }                   from '../../_models';

@Component({
  selector: 'app-device-entry',
  templateUrl: './device-entry.component.html',
  styleUrls: ['./device-entry.component.css']
})
export class DeviceEntryComponent implements OnInit {

  @Input() device: Device;

  constructor() { }

  ngOnInit() {
  }

}
