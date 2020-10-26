import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

// https://bcodes.io/blog/post/angular-universal-relative-to-absolute-http-interceptor
// because of https://angular.io/guide/universal#using-absolute-urls-for-server-requests
// see also https://github.com/swimmadude66/AngularPWASeed/tree/universal7/src/server
// see also HttpTransferStateModule

// case insensitive check against config and value
const startsWithAny = (arr: string[] = []) => (value = '') => {
  return arr.some((test) => value.toLowerCase().startsWith(test.toLowerCase()));
};

// http, https, protocol relative
const isAbsoluteURL = startsWithAny(['http', '//']);

@Injectable()
export class UniversalRelativeInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.request && !isAbsoluteURL(req.url)) {
      const protocolHost = `${this.request.protocol}://${this.request.get(
        'host'
      )}`;
      const pathSeparator = !req.url.startsWith('/') ? '/' : '';
      const url = protocolHost + pathSeparator + req.url;
      const serverRequest = req.clone({ url });
      return next.handle(serverRequest);
    } else {
      return next.handle(req);
    }
  }
}
