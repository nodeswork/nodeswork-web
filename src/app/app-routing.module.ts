import { NgModule }                        from '@angular/core';
import { RouterModule, Routes }            from '@angular/router';

import { VerifyEmailComponent }            from './auth/verify-email/verify-email.component';
import { RegisterComponent }               from './auth/register/register.component';
import { LoginComponent }                  from './auth/login/login.component';
import { SendVerifyEmailComponent }        from './auth/send-verify-email/send-verify-email.component';
import { HomeComponent }                   from './home/home.component';
import { AppletEditFormComponent }         from './applets/applet-edit-form/applet-edit-form.component';
import { UserAppletEditFormComponent }     from './applets/user-applet-edit-form/user-applet-edit-form.component';
import { AccountCreateFormComponent }      from './accounts/account-create-form/account-create-form.component';
import { OauthAccountVerifyComponent }     from './accounts/oauth-account-verify/oauth-account-verify.component';
import { DeviceStatusComponent }           from './devices/device-status/device-status.component';
import { FifaFut18AccountVerifyComponent } from './accounts/fifa-fut-18-account-verify/fifa-fut-18-account-verify.component';
import { UserAppletExecutionsComponent }   from './applets/user-applet-executions/user-applet-executions.component';
import { MyAppletControlPanelComponent }   from './applets/my-applet-control-panel/my-applet-control-panel.component';
import { MyDeviceControlPanelComponent }   from './devices/my-device-control-panel/my-device-control-panel.component';
import { AccountControlPanelComponent }    from './accounts/account-control-panel/account-control-panel.component';
import { AppletControlPanelComponent }     from './applets/applet-control-panel/applet-control-panel.component';
import { UserAppletAnalysisComponent }     from './applets/user-applet-analysis/user-applet-analysis.component';

const routes: Routes = [
  { path: '',                                         component: HomeComponent },
  { path: 'register',                                 component: RegisterComponent },
  { path: 'login',                                    component: LoginComponent },
  { path: 'sendVerifyEmail',                          component: SendVerifyEmailComponent },
  { path: 'verifyUserEmail',                          component: VerifyEmailComponent },
  { path: 'applets',                                  component: AppletControlPanelComponent },
  { path: 'applets/create',                           component: AppletEditFormComponent },
  { path: 'applets/:appletId/edit',                   component: AppletEditFormComponent },
  { path: 'my-applets',                               component: MyAppletControlPanelComponent },
  { path: 'my-applets/:userAppletId/edit',            component: UserAppletEditFormComponent },
  { path: 'my-applets/:userAppletId/analysis',        component: UserAppletAnalysisComponent },
  { path: 'my-applets/:userAppletId/executions',      component: UserAppletExecutionsComponent },
  { path: 'accounts',                                 component: AccountControlPanelComponent },
  { path: 'accounts/create',                          component: AccountCreateFormComponent },
  { path: 'accounts/:accountId/oauth-account-verify', component: OauthAccountVerifyComponent },
  { path: 'accounts/:accountId/fifa-fut-18-account-verify', component: FifaFut18AccountVerifyComponent },
  { path: 'devices',                                  component: MyDeviceControlPanelComponent },
  { path: 'devices/:deviceId',                        component: DeviceStatusComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
