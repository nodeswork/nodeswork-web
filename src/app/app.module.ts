import 'hammerjs';

import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
}                                   from '@angular/forms';
import { MaterialModule }           from '@angular/material';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
}                                   from '@angular/common/http';
import { FlashMessagesModule }      from 'angular2-flash-messages';

import { AppComponent }             from './app.component';
import { AppRoutingModule }         from './app-routing.module';
import {
  AuthInterceptor,
}                                   from './_interceptors';
import {
  AuthenticationService,
  UserService,
}                                   from './_services';
import { VerifyEmailComponent }     from './auth/verify-email/verify-email.component';
import { RegisterComponent }        from './auth/register/register.component';
import { LoginComponent }           from './auth/login/login.component';
import { SendVerifyEmailComponent } from './auth/send-verify-email/send-verify-email.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlashMessagesModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SendVerifyEmailComponent,
    VerifyEmailComponent,
  ],
  providers: [
    {
      provide:   HTTP_INTERCEPTORS,
      useClass:  AuthInterceptor,
      multi:     true,
    },
    AuthenticationService,
    UserService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
