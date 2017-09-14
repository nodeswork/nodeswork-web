import * as _                       from 'underscore';
import { Component, OnInit, Input } from '@angular/core';

import { UserAppletsService }       from '../../_services';
import { Applet }                   from '../../_models';

@Component({
  selector: 'app-applet-preview',
  templateUrl: './applet-preview.component.html',
  styleUrls: ['./applet-preview.component.css']
})
export class AppletPreviewComponent implements OnInit {

  @Input() applet: Applet;
  installed: boolean;

  constructor(
    private userAppletsService: UserAppletsService,
  ) {
    this.userAppletsService.myApplets().subscribe((myApplets) => {
      console.log('updating');
      this.installed = _.find(myApplets, (userApplet) => {
        return userApplet.applet._id === this.applet._id;
      }) != null;
      console.log('updating', this.installed);
    });
  }

  ngOnInit() {
  }

  async install() {
    const myNewApplet = await this.userAppletsService.install(this.applet);
  }
}
