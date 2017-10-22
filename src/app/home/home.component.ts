import { Component, OnInit }                from '@angular/core';
import { Router }                           from '@angular/router';

import { Applet }                           from '../_models';
import { AppletsService, UserStateService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  applets: Applet[] = [];

  constructor(
    private router:          Router,
    private userState:       UserStateService,
    private appletsService:  AppletsService,
  ) {
    this.userState.current().subscribe((user) => {
      if (user == null) {
        this.router.navigate(['/register']);
      }
    });
    this.appletsService.explore()
      .then((applets) => {
        this.applets = applets;
      });
  }

  ngOnInit() {
  }

}
