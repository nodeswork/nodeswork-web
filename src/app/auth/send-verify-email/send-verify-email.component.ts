import { Component }   from '@angular/core';

import { UserService } from '../../_services';

@Component({
  selector: 'app-send-verify-email',
  templateUrl: './send-verify-email.component.html',
  styleUrls: ['./send-verify-email.component.css']
})
export class SendVerifyEmailComponent {

  sending: boolean;
  emailSent: boolean;

  constructor(private userService: UserService) {}

  async sendVerificationEmail() {
    this.sending = true;
    await this.userService.sendVerifyEmail();
    this.emailSent = true;
  }
}
