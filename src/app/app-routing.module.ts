import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRegistorComponent } from './user-registor.component';

const routes: Routes = [
  { path: 'registor',  component: UserRegistorComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
