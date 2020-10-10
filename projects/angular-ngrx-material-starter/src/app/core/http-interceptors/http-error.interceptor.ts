import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
          }
        }
      }),
      catchError( errResponse => {
        if (errResponse instanceof HttpErrorResponse){
          if (errResponse.status === 401){
            return of(new HttpResponse({body: null, headers: errResponse.headers, status: 200}));
          } else if (errResponse.status === 403 && errResponse.url && errResponse.url.indexOf('https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com') < 0){
            return of(new HttpResponse({body: null, headers: errResponse.headers, status: 200}));
          } else {
            throw errResponse;
          }
        } else {
          throw errResponse;
        }
      })
    );
  }
}
