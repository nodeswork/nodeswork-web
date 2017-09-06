import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService }       from '../../_services';

@Component({
  selector: 'app-send-verify-email',
  templateUrl: './send-verify-email.component.html',
  styleUrls: ['./send-verify-email.component.css']
})
export class SendVerifyEmailComponent {

  sending: boolean;
  emailSent: boolean;

  constructor(
    private userService:  UserService,
    private router:       Router,
  ) {}

  async sendVerificationEmail() {
    this.sending = true;
    try {
      await this.userService.sendVerifyEmail();
    } catch (err) {
      if (err instanceof HttpErrorResponse &&
        err.error.message === 'Email address is already verified') {
        this.router.navigate(['']);
      } else {
        throw err;
      }
    }
    this.emailSent = true;
  }
}
