import 'hammerjs';

import { BrowserModule }                   from '@angular/platform-browser';
import { NgModule }                        from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
}                                          from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule,
  MATERIAL_COMPATIBILITY_MODE,
}                                          from '@angular/material';
import { FlexLayoutModule }                from '@angular/flex-layout';
import { BrowserAnimationsModule }         from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
}                                          from '@angular/common/http';

import { AppComponent }                    from './app.component';
import { AppRoutingModule }                from './app-routing.module';
import {
  AuthInterceptor,
}                                          from './_interceptors';
import {
  AccountsService,
  ApiClientService,
  AppletExecutionService,
  AppletsService,
  AuthenticationService,
  DevicesService,
  MenuService,
  MetricsService,
  UserAppletsService,
  UserService,
  UserStateService,
}                                          from './_services';
import { VerifyEmailComponent }            from './auth/verify-email/verify-email.component';
import { RegisterComponent }               from './auth/register/register.component';
import { LoginComponent }                  from './auth/login/login.component';
import { SendVerifyEmailComponent }        from './auth/send-verify-email/send-verify-email.component';
import { HomeComponent }                   from './home/home.component';
import { AppletEditFormComponent }         from './applets/applet-edit-form/applet-edit-form.component';
import { RootMenuComponent }               from './menus/root-menu/root-menu.component';
import { AppletControlPanelComponent }     from './applets/applet-control-panel/applet-control-panel.component';
import { AppletPreviewComponent }          from './applets/applet-preview/applet-preview.component';
import { MyAppletControlPanelComponent }   from './applets/my-applet-control-panel/my-applet-control-panel.component';
import { UserAppletEntryComponent }        from './applets/user-applet-entry/user-applet-entry.component';
import { MyDeviceControlPanelComponent }   from './devices/my-device-control-panel/my-device-control-panel.component';
import { DeviceEntryComponent }            from './devices/device-entry/device-entry.component';
import { UserAppletEditFormComponent }     from './applets/user-applet-edit-form/user-applet-edit-form.component';
import { HeadMenuComponent }               from './menus/head-menu/head-menu.component';
import { PageComponent }                   from './skeleton/page/page.component';
import { AccountCreateFormComponent }      from './accounts/account-create-form/account-create-form.component';
import { AccountTypeEntryComponent }       from './accounts/account-type-entry/account-type-entry.component';
import { AccountControlPanelComponent }    from './accounts/account-control-panel/account-control-panel.component';
import { AccountEntryComponent }           from './accounts/account-entry/account-entry.component';
import { OauthAccountVerifyComponent }     from './accounts/oauth-account-verify/oauth-account-verify.component';
import { DeviceStatusComponent }           from './devices/device-status/device-status.component';
import { ConfirmDialogComponent }          from './utils/confirm-dialog/confirm-dialog.component';
import { FifaFut18CreateDialogComponent }  from './accounts/fifa-fut-18-create-dialog/fifa-fut-18-create-dialog.component';
import { FifaFut18AccountVerifyComponent } from './accounts/fifa-fut-18-account-verify/fifa-fut-18-account-verify.component';
import { UserAppletExecutionsComponent }   from './applets/user-applet-executions/user-applet-executions.component';
import { FooterMenuComponent }             from './menus/footer-menu/footer-menu.component';
import { MetricsPanelComponent }           from './metrics/metrics-panel/metrics-panel.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
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
    UserAppletEditFormComponent,
    UserAppletEntryComponent,
    VerifyEmailComponent,
    HeadMenuComponent,
    PageComponent,
    AccountCreateFormComponent,
    AccountTypeEntryComponent,
    AccountControlPanelComponent,
    AccountEntryComponent,
    OauthAccountVerifyComponent,
    DeviceStatusComponent,
    ConfirmDialogComponent,
    FifaFut18CreateDialogComponent,
    FifaFut18AccountVerifyComponent,
    UserAppletExecutionsComponent,
    FooterMenuComponent,
    MetricsPanelComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    FifaFut18CreateDialogComponent,
  ],
  providers: [
    {
      provide:   HTTP_INTERCEPTORS,
      useClass:  AuthInterceptor,
      multi:     true,
    },
    {
      provide:   MATERIAL_COMPATIBILITY_MODE,
      useValue:  true,
    },
    ApiClientService,
    AccountsService,
    AppletExecutionService,
    AppletsService,
    AuthenticationService,
    DevicesService,
    MenuService,
    MetricsService,
    UserAppletsService,
    UserService,
    UserStateService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
