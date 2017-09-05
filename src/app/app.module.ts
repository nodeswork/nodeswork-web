import 'hammerjs';

import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
}                                  from '@angular/forms';
import { MaterialModule }          from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }        from '@angular/common/http';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import {
  AuthenticationService,
  UserService,
}                                  from './_services';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    VerifyEmailComponent,
    RegisterComponent,
    LoginComponent,
  ],
  providers: [
    AuthenticationService,
    UserService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
