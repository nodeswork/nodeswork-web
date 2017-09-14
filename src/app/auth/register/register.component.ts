import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../_services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css', '../auth.component.css' ],
})
export class RegisterComponent {

  rForm:           FormGroup;
  loading:         boolean;
  registerFailed:  boolean;
  userExists:      boolean;

  constructor(private fb: FormBuilder, private userService: UserService) {

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

  register() {
    this.registerFailed = false;

    if (!this.rForm.valid) {
      return;
    }

    this.loading = true;
    this.userService.create(this.rForm.value).subscribe(
      data => {
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.registerFailed = true;
        if (error.error && error.error.message === 'duplicate record') {
          this.userExists = true;
        } else {
          this.userExists = false;
        }
      },
    );
  }
}
