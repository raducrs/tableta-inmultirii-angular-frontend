import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {authGoToAccount, authLogin, authLogout, authRefresh} from './auth.actions';
import {select, Store} from '@ngrx/store';
import {selectBooks} from '../../features/examples/crud/books.selectors';
import {selectCognitoUser} from './auth.selectors';
import {Auth} from 'aws-amplify'

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store,
  ) {}

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        withLatestFrom(this.store.pipe(select(selectCognitoUser))),
        tap(([ action, cognitoUser]) =>
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true , cognitoUser})
        )
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['']);
          }
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
          Auth.signOut();
        })
      ),
    { dispatch: false }
  );

  refresh = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authRefresh),
        tap(() => {
          Auth.currentSession().then(
            session => {
              Auth.currentAuthenticatedUser().then(
                user => {
                  if (user && user.username){
                    this.store.dispatch(authLogin({cognitoUser: {username: user.username, idToken: user.signInUserSession.idToken.getJwtToken(), ...user.attributes}}));
                  } else {
                    this.store.dispatch(authLogout({redirect: false}));
                  }
                },
                err => this.store.dispatch(authLogout({redirect: false})))
            },
            err =>  {}
          )
        })
      ),
    { dispatch: false }
  );

  goToAccount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authGoToAccount),
        withLatestFrom(this.store.pipe(select(selectCognitoUser))),
        tap(([action, user]) => {
          const navUrl = user['custom:usergroup'] === 'partener' ? '/puser' : '/duser';
          this.router.navigateByUrl(navUrl);
        })
      ),
    { dispatch: false }
  );
}
