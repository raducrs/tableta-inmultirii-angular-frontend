import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {DonationService} from '../donation.service';
import {
  actionDonationPost,
  actionDonationPostError,
  actionDonationPostSuccess,
  actionGadgetClear, actionUserUpdate, actionUserUpdateFromLogin
} from './donation.actions';
import {Observable, of} from 'rxjs';
import {DonationState, DonationUser} from './donation.model';
import {Action, select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {selectCognitoUser, selectIsAuthenticated} from '../../../core/auth/auth.selectors';
import {authLogout, authNOOP} from '../../../core/auth/auth.actions';


@Injectable()
export class DonationEffects {
  constructor(
    private actions$: Actions,
    private donationService: DonationService,
    private store: Store<DonationState>,
    private router: Router,
    private globalStore: Store
  ) {}

  postDonation = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionDonationPost),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(( [ donation, cognitoUser] ) => {
          // @ts-ignore
          return  this.donationService.post( donation, cognitoUser).pipe(
            map(() => {
              this.store.dispatch(actionGadgetClear());
              this.router.navigate(['/donate/thank-you']);
              return actionDonationPostSuccess();
            }) ,
            catchError((error) => of(actionDonationPostError({ error })))
          )}
        )
      )
  );

  updateFromLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionUserUpdateFromLogin),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        map(( [ action, user] ) => {
          if (user && user.username) {
            return actionUserUpdate({
              user: {
                name: user.name,
                email: user.email,
                phone: user.phone_number,
                registeredUser: true,
              }
            })
          }
        }),
        catchError((error) => of(actionDonationPostError({ error })))
      )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        withLatestFrom(this.globalStore.pipe(select(selectIsAuthenticated))),
        map(([action, isAuth]) => {
          if (isAuth) {
            return actionUserUpdate({
              user: {} as DonationUser
            })
          } else {
            return authNOOP()
          }
        })
      )
  );
}
