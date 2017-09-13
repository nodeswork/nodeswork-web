import 'hammerjs';

import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
}                                   from '@angular/forms';
import { MaterialModule }           from '@angular/material';
import { FlexLayoutModule }         from '@angular/flex-layout';
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
  AppletsService,
  UserService,
  UserStateService,
}                                   from './_services';
import { VerifyEmailComponent }     from './auth/verify-email/verify-email.component';
import { RegisterComponent }        from './auth/register/register.component';
import { LoginComponent }           from './auth/login/login.component';
import { SendVerifyEmailComponent } from './auth/send-verify-email/send-verify-email.component';
import { HomeComponent }            from './home/home.component';
import { AppletEditFormComponent }  from './applets/applet-edit-form/applet-edit-form.component';
import { RootMenuComponent } from './menus/root-menu/root-menu.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlashMessagesModule,
    FlexLayoutModule,
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
    HomeComponent,
    AppletEditFormComponent,
    RootMenuComponent,
  ],
  providers: [
    {
      provide:   HTTP_INTERCEPTORS,
      useClass:  AuthInterceptor,
      multi:     true,
    },
    AuthenticationService,
    AppletsService,
    UserService,
    UserStateService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
