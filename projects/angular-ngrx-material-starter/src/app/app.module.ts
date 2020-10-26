import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
// import { ScullyLibModule } from '@scullyio/ng-lib';

import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';

registerLocaleData(localeRo);

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),

    // core
    CoreModule,

    // app
    AppRoutingModule,

    // ScullyLibModule,

    BrowserTransferStateModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
