import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppLightServerModule } from './app/app-light/app-light.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
