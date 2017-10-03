import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
}                            from '@angular/forms';

import {
  fifa18,
}                            from '../../_models';
import { AccountsService }   from '../../_services';

@Component({
  selector: 'app-fifa-fut-18-account-verify',
  templateUrl: './fifa-fut-18-account-verify.component.html',
  styleUrls: ['./fifa-fut-18-account-verify.component.css']
})
export class FifaFut18AccountVerifyComponent implements OnInit {

  public rForm:   FormGroup;
  public rForm2:  FormGroup;
  public rForm4:  FormGroup;
  public account: fifa18.FifaFut18Account;
  public step = 1;
  public metadata: fifa18.Fifa18ClientMetadata;

  constructor(
    private fb: FormBuilder,
    private route:            ActivatedRoute,
    private accountsService:  AccountsService,
  ) {
    this.route.params.subscribe(async (params) => {
      this.account = (
        await this.accountsService.get(params.accountId)
      ) as fifa18.FifaFut18Account;
      this.rForm.controls.email.setValue(this.account.email);
    });

    this.rForm = fb.group({
      email: '',
      password: ['', Validators.required ],
    });
    this.rForm2 = fb.group({
      code: ['', Validators.required ],
    });
    this.rForm4 = fb.group({
      secret: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }

  process(resp: fifa18.Fifa18VerifyResponse) {
    this.step      = resp.metadata.stateIndex;
    this.metadata  = resp.metadata;
  }

  async verify() {
    switch (this.step) {
      case 1:
        if (!this.rForm.valid) {
          return;
        }

        let resp = await this.accountsService.verify(
          this.account._id, {
            step:     this.step,
            password: this.rForm.controls.password.value,
          },
        );
        this.process(resp);
        break;

      case 2:
        if (!this.rForm2.valid) {
          return;
        }
        resp = await this.accountsService.verify(
          this.account._id, {
            step: this.step,
            code: this.rForm2.controls.code.value,
          },
        );
        this.process(resp);
        break;

      case 4:
        if (!this.rForm4.valid) {
          return;
        }
        resp = await this.accountsService.verify(
          this.account._id, {
            step:    this.step,
            secret:  this.rForm4.controls.secret.value,
          },
        );
        this.process(resp);
        break;
    }
  }
}
