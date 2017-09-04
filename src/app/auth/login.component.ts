import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: [ './auth.component.css' ],
})
export class UserLoginComponent {

  rForm:           FormGroup;
  loading:         boolean;
  loginFailed:     boolean;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {
    this.rForm = fb.group({

      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
    });
  }

  async login() {
    try {
      const user = await this.authenticationService.login(
        this.rForm.value.email,
        this.rForm.value.password,
      );
      console.log('user', user);
    } catch (err) {
      this.loginFailed = true;
      console.error('err', err);
    }
  }
}
