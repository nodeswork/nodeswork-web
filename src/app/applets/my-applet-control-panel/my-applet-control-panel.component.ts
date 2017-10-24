import * as _                 from 'underscore';
import { Component, OnInit }  from '@angular/core';

import { UserAppletsService } from '../../_services';
import { UserApplet }         from '../../_models';

@Component({
  selector: 'app-my-applet-control-panel',
  templateUrl: './my-applet-control-panel.component.html',
  styleUrls: ['./my-applet-control-panel.component.css']
})
export class MyAppletControlPanelComponent implements OnInit {

  myApplets:       UserApplet[] = [];
  onlineApplets:   UserApplet[] = [];
  offlineApplets:  UserApplet[] = [];
  online:          number;

  constructor(
    private userAppletsService: UserAppletsService,
  ) {
    this.userAppletsService.myApplets().subscribe((myApplets) => {
      this.myApplets      = myApplets;
      this.onlineApplets  = _.filter(
        myApplets, (userApplet) => userApplet.stats.online,
      );
      this.offlineApplets  = _.filter(
        myApplets, (userApplet) => !userApplet.stats.online,
      );
      this.online = this.onlineApplets.length;
    });
  }

  ngOnInit() {
  }

}
