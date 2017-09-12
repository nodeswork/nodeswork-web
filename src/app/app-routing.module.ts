import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { VerifyEmailComponent }     from './auth/verify-email/verify-email.component';
import { RegisterComponent }        from './auth/register/register.component';
import { LoginComponent }           from './auth/login/login.component';
import { SendVerifyEmailComponent } from './auth/send-verify-email/send-verify-email.component';
import { HomeComponent }            from './home/home.component';
import { AppletEditFormComponent }  from './applets/applet-edit-form/applet-edit-form.component';

const routes: Routes = [
  { path: '',                      component: HomeComponent },
  { path: 'register',              component: RegisterComponent },
  { path: 'login',                 component: LoginComponent },
  { path: 'sendVerifyEmail',       component: SendVerifyEmailComponent },
  { path: 'verifyUserEmail',       component: VerifyEmailComponent },
  { path: 'applets/create',        component: AppletEditFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
