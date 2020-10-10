import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {PuserService} from '../puser.service';
import {
  actionADonationAccept, actionADonationReject, actionADonationRejectError, actionADonationRejectSuccess,
  actionADonationRetrieve,
  actionADonationRetrieveError,
  actionADonationRetrieveSuccess,
  actionADonationShowContact,
  actionADonationsRetrieve,
  actionADonationsRetrieveError,
  actionADonationsRetrieveSuccess,
  actionADonationStatusError,
  actionADonationStatusSuccess,
  actionADonationStatusUpdate, actionDonationsClear,
  actionLDonationAccept,
  actionLDonationAcceptError,
  actionLDonationAcceptSuccess,
  actionLDonationAcceptTakenError,
  actionLDonationReject,
  actionLDonationRejectError,
  actionLDonationRejectSuccess,
  actionLDonationsRetrieve,
  actionLDonationsRetrieveError,
  actionLDonationsRetrieveSuccess,
  actionTDonationAccept,
  actionTDonationAcceptError,
  actionTDonationAcceptSuccess,
  actionTDonationReject,
  actionTDonationRejectError,
  actionTDonationRejectSuccess,
  actionTDonationsRetrieve,
  actionTDonationsRetrieveError,
  actionTDonationsRetrieveSuccess
} from './puser.actions';

import {select, Store} from '@ngrx/store';
import {selectCognitoUser} from '../../../core/auth/auth.selectors';
import {authLogout} from '../../../core/auth/auth.actions';

@Injectable()
export class PuserEffects {
  constructor(
    private actions$: Actions,
    private duserService: PuserService,
    private globalStore: Store
  ) {}

  getTDonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTDonationsRetrieve),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
         this.duserService.getDonations(cognitoUser).pipe(
           map((donations) => actionTDonationsRetrieveSuccess({donations})),
           catchError((error) => of(actionTDonationsRetrieveError({ error })))
         )
        )
      )
  );

  acceptTDonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTDonationAccept),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.acceptDonation(action.donation, cognitoUser).pipe(
            switchMap(() => {
              return [actionTDonationAcceptSuccess({ donation: action.donation}), actionADonationAccept( { donation: { ...action.donation, status: 'accepted'}}) ]
            }),
            catchError((error) => of(actionTDonationAcceptError({ error })))
          )
        )
      )
  );

  rejectTDonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTDonationReject),
        switchMap((action) =>
          this.duserService.rejectDonation(action.donation).pipe(
            map(() => actionTDonationRejectSuccess({ donation: action.donation})),
            catchError((error) => of(actionTDonationRejectError({ error })))
          )
        )
      )
  );

  // LOCATION

  getLDonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLDonationsRetrieve),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.getLocationDonations(cognitoUser).pipe(
            map((donations) => actionLDonationsRetrieveSuccess({donations})),
            catchError((error) => of(actionLDonationsRetrieveError({ error })))
          )
        )
      )
  );

  acceptLDonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLDonationAccept),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([ action, cognitoUser]) =>
          this.duserService.acceptDonation(action.donation, cognitoUser).pipe(
            switchMap(() => {
              return [actionLDonationAcceptSuccess({ donation: action.donation}), actionADonationAccept({ donation: { ...action.donation, status: 'accepted'}}) ]
            }),
            catchError((error) => {
              if ( error.message && error.message.contain('already accepted')){
                return of(actionLDonationAcceptTakenError({ error , donation: action.donation}))
              }
              return of(actionLDonationAcceptError({ error }))
            })
          )
        )
      )
  );

  rejectLDonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLDonationReject),
        switchMap((action) =>
          this.duserService.rejectDonation(action.donation).pipe(
            map(() => actionLDonationRejectSuccess({ donation: action.donation})),
            catchError((error) => of(actionLDonationRejectError({ error })))
          )
        )
      )
  );

  // ACCEPTED

  getADonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionADonationsRetrieve),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.getAcceptedDonations(cognitoUser).pipe(
            map((donations) => actionADonationsRetrieveSuccess({donations})),
            catchError((error) => of(actionADonationsRetrieveError({ error })))
          )
        )
      )
  );

  getADonationsDetail = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionADonationRetrieve),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.getADonationDetails(action.id, cognitoUser).pipe(
            map((details) => actionADonationRetrieveSuccess({id: action.id, details})),
            catchError((error) => of(actionADonationRetrieveError({ id: action.id, error })))
          )
        )
      )
  );

  getADonationsShowContact = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionADonationShowContact),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.setADonationStatus(action.id, 'contact-shown', cognitoUser).pipe(
            switchMap((details) => [ actionADonationStatusSuccess({id: action.id, status: 'contact-shown'}), actionADonationRetrieve({id: action.id})]),
            catchError((error) => of( actionADonationStatusError({ id: action.id, error })))
          )
        )
      )
  );

  getADonationsStatusUpdate = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionADonationStatusUpdate),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.setADonationStatus(action.id, action.status, cognitoUser).pipe(
            map((details) => actionADonationStatusSuccess({id: action.id, status: action.status})),
            catchError((error) => of( actionADonationStatusError({ id: action.id, error })))
          )
        )
      )
  );

  removeADonations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionADonationReject),
        withLatestFrom(this.globalStore.pipe(select(selectCognitoUser))),
        switchMap(([action, cognitoUser]) =>
          this.duserService.rejectADonation(action.id, cognitoUser).pipe(
            map((details) => actionADonationRejectSuccess({id: action.id})),
            catchError((error) => of( actionADonationRejectError({ error })))
          )
        )
      )
  );


  // FOR ALL
  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        map((action) => actionDonationsClear())
      )
  );
}
