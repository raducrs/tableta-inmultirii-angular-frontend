import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly _isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId) {
    this._isBrowser = isPlatformBrowser(platformId);
  }

  get isBrowser(): boolean {
    return this._isBrowser;
  }
}
