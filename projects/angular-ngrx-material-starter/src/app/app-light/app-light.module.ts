import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

const routes: Routes = [
  {
    path: 'light',
    loadChildren: () =>
      import('./light/light.module').then((m) => m.LightModule)
  }]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
      initialNavigation: 'enabled'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppLightModule { }
