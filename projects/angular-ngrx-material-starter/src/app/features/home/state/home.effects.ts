import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  actionHomeLatestNoop,
  actionHomeLatestRetrieve,
  actionHomeLatestRetrieveError,
  actionHomeLatestRetrieveStatic,
  actionHomeLatestSuccess,
  actionStatGadgetsRetrieve,
  actionStatGadgetsRetrieveError,
  actionStatGadgetsRetrieveStatic,
  actionStatGadgetsSuccess,
  actionStatGadgetstNoop
} from './home.actions';
import { of } from 'rxjs';

import { HomeService } from '../home.service';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  retrieveLatest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionHomeLatestRetrieve),
      switchMap((action) =>
        this.homeService.getLatest().pipe(
          map((latest) => {
            if (latest) {
              return actionHomeLatestSuccess({ latest });
            } else {
              return actionHomeLatestNoop();
            }
          }),
          catchError((error) => of(actionHomeLatestRetrieveStatic()))
        )
      )
    )
  );

  retrieveLatestStatic = createEffect(() =>
    this.actions$.pipe(
      ofType(actionHomeLatestRetrieveStatic),
      switchMap((action) =>
        this.homeService.getLatestStatic().pipe(
          map((latest) => actionHomeLatestSuccess({ latest })),
          catchError((error) => of(actionHomeLatestRetrieveError({ error })))
        )
      )
    )
  );

  retrieveGadgets = createEffect(() =>
    this.actions$.pipe(
      ofType(actionStatGadgetsRetrieve),
      switchMap((action) =>
        this.homeService.getGadgets().pipe(
          map((gadgets) => {
            if (gadgets) {
              return actionStatGadgetsSuccess({ gadgets });
            } else {
              return actionStatGadgetstNoop();
            }
          }),
          catchError((error) => of(actionStatGadgetsRetrieveStatic()))
        )
      )
    )
  );

  retrieveGadgetsStatic = createEffect(() =>
    this.actions$.pipe(
      ofType(actionStatGadgetsRetrieveStatic),
      switchMap((action) =>
        this.homeService.getGadgetsStatsStatic().pipe(
          map((gadgets) => actionStatGadgetsSuccess({ gadgets })),
          catchError((error) => of(actionStatGadgetsRetrieveError({ error })))
        )
      )
    )
  );
}
