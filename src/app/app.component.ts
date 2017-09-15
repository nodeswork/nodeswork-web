import { Component, ViewChild, OnInit }  from '@angular/core';
import { MdSidenav }                     from '@angular/material';

import { MenuService, UserStateService } from './_services';

import { screenSize, SIZE_XS }           from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sideNav: MdSidenav;

  isLogin  = false;
  mode     = 'side';

  constructor(
    private userState:  UserStateService,
    private menuService: MenuService,
  ) {
    this.userState.current().subscribe((user) => {
      this.isLogin = user != null;
    });
    this.menuService.menu().subscribe((opened) => {
      if (opened) {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    });
  }

  ngOnInit() {
    if (screenSize === SIZE_XS) {
      this.mode = 'over';
    } else if (this.isLogin) {
      this.sideNav.open();
    }
  }

  openMenu() {
    this.sideNav.open();
  }

  closeMenu() {
    this.sideNav.close();
  }
}
