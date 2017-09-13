import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { UserStateService }  from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:     Router,
    private userState:  UserStateService,
  ) {
    this.userState.current().subscribe((user) => {
      if (user == null) {
        this.router.navigate(['/register']);
      }
    });
  }

  ngOnInit() {
  }

}
