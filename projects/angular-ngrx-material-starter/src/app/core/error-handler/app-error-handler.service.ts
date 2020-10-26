import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../notifications/notification.service';
import { Store } from '@ngrx/store';
import { authLogout } from '../auth/auth.actions';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(
    private notificationsService: NotificationService,
    private injector: Injector
  ) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'Avem o problema momentan. Incearca mai tarziu';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    if (
      error &&
      error instanceof HttpErrorResponse &&
      error.error &&
      error.error.message &&
      error.error.message.indexOf('token has expired') >= 0
    ) {
      this.notificationsService.errorLong(
        'Sesiunea a expirat!. Autentifica-te din nou'
      );
      const store = this.injector.get(Store);
      if (store) {
        store.dispatch(authLogout({ redirect: false }));
      }
    } else if (
      error &&
      error instanceof HttpErrorResponse &&
      error.error &&
      error.error.message &&
      error.error.message.indexOf('Unauthorized') >= 0
    ) {
      this.notificationsService.errorLong(
        'Acces respins. Autentifica-te sau cere drepturi'
      );
    } else if (
      error &&
      error instanceof HttpErrorResponse &&
      error.status === 403 &&
      error.url &&
      error.url.indexOf(
        'https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com'
      ) < 0
    ) {
      this.notificationsService.errorLong(
        'Acces respins. Operatiunea nu este permisa. Autentifica-te sau cere drepturi'
      );
    } else if (
      error &&
      error instanceof HttpErrorResponse &&
      error.url &&
      error.url.indexOf(
        'https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com'
      ) >= 0
    ) {
      // NOOP
    } else if (
      error &&
      error instanceof HttpErrorResponse &&
      error.url &&
      error.url.indexOf('/schools') >= 0
    ) {
      // NOOP
    } else if (
      error &&
      error instanceof HttpErrorResponse &&
      error.status === 304
    ) {
      // NOOP because of cache from ETag
    } else {
      this.notificationsService.error(displayMessage);
    }

    super.handleError(error);
  }
}
