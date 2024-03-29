import { Component }                                       from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router }                                          from '@angular/router';

import { AuthenticationService }                           from '../../_services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css', '../auth.component.css' ],
})
export class LoginComponent {

  rForm:           FormGroup;
  loading:         boolean;
  loginFailed:     boolean;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
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
      this.router.navigate(['']);
    } catch (err) {
      switch (err.error && err.error.message) {
        case 'user is not active':
          this.router.navigate(['/sendVerifyEmail']);
          break;
        default:
          console.error('err', err);
          this.loginFailed = true;
      }
    }
  }
}
