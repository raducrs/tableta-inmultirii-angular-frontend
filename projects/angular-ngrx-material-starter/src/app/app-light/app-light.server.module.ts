import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';

import {AppLightModule} from './app-light.module';
import {AppComponent} from './app/app.component';

@NgModule({
  imports: [AppLightModule, ServerModule, ServerTransferStateModule],
  bootstrap: [AppComponent]
})
export class AppLightServerModule {}
