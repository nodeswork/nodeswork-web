import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA }           from '@angular/material';

@Component({
  selector: 'app-user-applet-action-result',
  templateUrl: './user-applet-action-result.component.html',
  styleUrls: ['./user-applet-action-result.component.css']
})
export class UserAppletActionResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
