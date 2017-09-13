import { Component, OnInit, Input } from '@angular/core';

import { Applet }                   from '../../_models';

@Component({
  selector: 'app-applet-preview',
  templateUrl: './applet-preview.component.html',
  styleUrls: ['./applet-preview.component.css']
})
export class AppletPreviewComponent implements OnInit {

  @Input() applet: Applet;

  constructor() { }

  ngOnInit() {
  }

}
