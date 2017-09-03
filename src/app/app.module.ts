import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';
import { UserRegistorComponent } from './user-registor.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    UserRegistorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
