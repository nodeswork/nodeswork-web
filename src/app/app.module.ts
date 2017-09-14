import 'hammerjs';

import { BrowserModule }                 from '@angular/platform-browser';
import { NgModule }                      from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
}                                        from '@angular/forms';
import { MaterialModule }                from '@angular/material';
import { FlexLayoutModule }              from '@angular/flex-layout';
import { BrowserAnimationsModule }       from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
}                                        from '@angular/common/http';
import { FlashMessagesModule }           from 'angular2-flash-messages';

import { AppComponent }                  from './app.component';
import { AppRoutingModule }              from './app-routing.module';
import {
  AuthInterceptor,
}                                        from './_interceptors';
import {
  AppletsService,
  AuthenticationService,
  DevicesService,
  UserAppletsService,
  UserService,
  UserStateService,
}                                        from './_services';
import { VerifyEmailComponent }          from './auth/verify-email/verify-email.component';
import { RegisterComponent }             from './auth/register/register.component';
import { LoginComponent }                from './auth/login/login.component';
import { SendVerifyEmailComponent }      from './auth/send-verify-email/send-verify-email.component';
import { HomeComponent }                 from './home/home.component';
import { AppletEditFormComponent }       from './applets/applet-edit-form/applet-edit-form.component';
import { RootMenuComponent }             from './menus/root-menu/root-menu.component';
import { AppletControlPanelComponent }   from './applets/applet-control-panel/applet-control-panel.component';
import { AppletPreviewComponent }        from './applets/applet-preview/applet-preview.component';
import { MyAppletControlPanelComponent } from './applets/my-applet-control-panel/my-applet-control-panel.component';
import { UserAppletEntryComponent }      from './applets/user-applet-entry/user-applet-entry.component';
import { MyDeviceControlPanelComponent } from './devices/my-device-control-panel/my-device-control-panel.component';
import { DeviceEntryComponent }          from './devices/device-entry/device-entry.component';
import { UserAppletEditFormComponent }   from './applets/user-applet-edit-form/user-applet-edit-form.component';

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
    AppletControlPanelComponent,
    AppletEditFormComponent,
    AppletPreviewComponent,
    DeviceEntryComponent,
    HomeComponent,
    LoginComponent,
    MyAppletControlPanelComponent,
    MyDeviceControlPanelComponent,
    RegisterComponent,
    RootMenuComponent,
    SendVerifyEmailComponent,
    UserAppletEntryComponent,
    VerifyEmailComponent,
  ],
  providers: [
    {
      provide:   HTTP_INTERCEPTORS,
      useClass:  AuthInterceptor,
      multi:     true,
    },
    AppletsService,
    AuthenticationService,
    DevicesService,
    UserAppletsService,
    UserService,
    UserStateService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
