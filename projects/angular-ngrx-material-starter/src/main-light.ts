import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import {AppLightModule} from './app/app-light/app-light.module';



if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
  .bootstrapModule(AppLightModule)
  .catch((err) => console.error(err));
});
