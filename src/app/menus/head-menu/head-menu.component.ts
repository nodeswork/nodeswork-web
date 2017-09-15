import { Component, OnInit }   from '@angular/core';

import { MenuService }         from '../../_services';

import { screenSize, SIZE_XS } from '../../utils';

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.css']
})
export class HeadMenuComponent implements OnInit {

  showMenuIcon = screenSize !== SIZE_XS;

  constructor(
    private menuService: MenuService,
  ) {
  }

  ngOnInit() {
  }

  openMenu() {
    this.menuService.open();
  }
}
