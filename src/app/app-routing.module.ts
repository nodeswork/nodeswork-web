import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './auth/login.component';
import { UserRegistorComponent } from './auth/register.component';

const routes: Routes = [
  { path: 'register',  component: UserRegistorComponent },
  { path: 'login',     component: UserLoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
