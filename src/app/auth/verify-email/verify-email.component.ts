import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService }       from '../../_services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  tokenExpired: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      try {
        await this.userService.verifyEmail(params.token);
      } catch (err) {
        if (err instanceof HttpErrorResponse &&
          err.error.message === 'Unrecognized token') {
          this.tokenExpired = true;
        } else {
          // TODO: server error
        }
      }
    });
  }
}
