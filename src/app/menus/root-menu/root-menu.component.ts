import { Component, OnInit } from '@angular/core';

import { MenuService }       from '../../_services';

@Component({
  selector: 'app-root-menu',
  templateUrl: './root-menu.component.html',
  styleUrls: ['./root-menu.component.css']
})
export class RootMenuComponent implements OnInit {

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menuService.close();
  }

}
