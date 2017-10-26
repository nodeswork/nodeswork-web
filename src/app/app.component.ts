import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav }                   from '@angular/material';

import {
  ApiClientService, MenuService,
  UserStateService,
}                                       from './_services';
import { screenSize, SIZE_XS }          from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sideNav: MatSidenav;

  isLogin  = false;
  mode     = 'side';
  loading: boolean;

  constructor(
    private userState:    UserStateService,
    private menuService:  MenuService,
    private apiClient:    ApiClientService,
  ) {
    this.apiClient.blockingState().subscribe((loading) => {
      this.loading = loading;
    });
    this.userState.current().subscribe((user) => {
      this.isLogin = user != null;
      if (this.sideNav) {
        this.refresh();
      }
    });
    this.menuService.menu().subscribe((opened) => {
      if (opened) {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    });
  }

  private refresh()  {
    if (screenSize === SIZE_XS) {
      this.mode = 'over';
    } else if (this.isLogin) {
      this.sideNav.open();
    } else if (!this.isLogin) {
      this.sideNav.close();
    }
  }

  ngOnInit() {
    this.refresh();
  }

  openMenu() {
    this.sideNav.open();
  }

  closeMenu() {
    if (screenSize === SIZE_XS || !this.isLogin) {
      this.sideNav.close();
    }
  }
}
