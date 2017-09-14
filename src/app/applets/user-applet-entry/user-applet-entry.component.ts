import { Component, OnInit, Input } from '@angular/core';

import { UserApplet }               from '../../_models';

@Component({
  selector: 'app-user-applet-entry',
  templateUrl: './user-applet-entry.component.html',
  styleUrls: ['./user-applet-entry.component.css']
})
export class UserAppletEntryComponent implements OnInit {

  @Input() userApplet: UserApplet;

  constructor() { }

  ngOnInit() {
  }

}
