import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {
  actionDonationsClear,
  actionDonationsRetrieve,
  actionDonationsRetrieveError,
  actionDonationsRetrieveSuccess,
} from './duser.actions';
import {of} from 'rxjs';
import {DUserService} from '../duser.service';
import {CognitoUser} from '../../../core/auth/auth.models';
import {select, Store} from '@ngrx/store';
import {selectCognitoUser} from '../../../core/auth/auth.selectors';
import {authLogout} from '../../../core/auth/auth.actions';

@Injectable()
export class DuserEffects {
  constructor(
    private actions$: Actions,
    private duserService: DUserService,
    private globalStore: Store
  ) {}

  postDonation = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionDonationsRetrieve),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
         this.duserService.getDonations(cognitoUser).pipe(
           map((donations) => actionDonationsRetrieveSuccess({donations})),
           catchError((error) => of(actionDonationsRetrieveError({ error })))
         )
        )
      )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        map((action) => actionDonationsClear())
      )
  );
}
