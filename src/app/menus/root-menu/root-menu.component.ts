import { Component, OnInit } from '@angular/core';

import {
  AuthenticationService,
  MenuService,
}                            from '../../_services';

@Component({
  selector: 'app-root-menu',
  templateUrl: './root-menu.component.html',
  styleUrls: ['./root-menu.component.css']
})
export class RootMenuComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menuService.close();
  }

  async logout() {
    await this.authenticationService.logout();
    this.closeMenu();
  }
}
