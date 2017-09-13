import { Component }        from '@angular/core';

import { UserStateService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLogin = false;

  constructor(
    private userState:  UserStateService,
  ) {
    this.userState.current().subscribe((user) => {
      this.isLogin = user != null;
    });
  }
}
