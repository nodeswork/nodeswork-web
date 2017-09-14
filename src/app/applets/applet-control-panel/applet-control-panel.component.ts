import { Component, OnInit } from '@angular/core';

import { Applet }            from '../../_models';
import { AppletsService }    from '../../_services';

@Component({
  selector: 'app-applet-control-panel',
  templateUrl: './applet-control-panel.component.html',
  styleUrls: ['./applet-control-panel.component.css']
})
export class AppletControlPanelComponent implements OnInit {

  applets: Applet[] = [];

  constructor(private appletsService: AppletsService) {
    this.appletsService.find().then((applets) => {
      this.applets = applets;
    });
  }

  ngOnInit() {
  }

}
