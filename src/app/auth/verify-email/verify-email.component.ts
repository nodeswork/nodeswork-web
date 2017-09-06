import 'rxjs/add/operator/map';

import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse }      from '@angular/common/http';
import { FlashMessagesService }   from 'angular2-flash-messages';

import { UserService }            from '../../_services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private userService:           UserService,
    private route:                 ActivatedRoute,
    private router:                Router,
    private flashMessagesService:  FlashMessagesService,
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      try {
        await this.userService.verifyEmail(params.token);
        this.router.navigate(['']);
      } catch (err) {
        if (err instanceof HttpErrorResponse &&
          err.error.message === 'Unrecognized token') {
          this.flashMessagesService.show('Flashing message', {
            timeout:  5000,
          });
          this.router.navigate(['/sendVerifyEmail']);
        } else {
          // TODO: server error
        }
      }
    });
  }
}
