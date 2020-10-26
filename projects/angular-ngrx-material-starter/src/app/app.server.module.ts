import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalRelativeInterceptor } from './server/universal-http.interceptor';

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalRelativeInterceptor,
      multi: true
    }
  ]
})
export class AppServerModule {}
