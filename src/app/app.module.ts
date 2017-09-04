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
import { UserLoginComponent }      from './auth/login.component';
import { UserRegistorComponent }   from './auth/register.component';
import {
  AuthenticationService,
  UserService,
}                                  from './_services';

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
    UserLoginComponent,
    UserRegistorComponent,
  ],
  providers: [
    AuthenticationService,
    UserService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
