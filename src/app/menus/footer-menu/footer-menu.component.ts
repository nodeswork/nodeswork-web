import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.css']
})
export class FooterMenuComponent implements OnInit {

  @Input() active: string;

  constructor() { }

  ngOnInit() {
  }

}
