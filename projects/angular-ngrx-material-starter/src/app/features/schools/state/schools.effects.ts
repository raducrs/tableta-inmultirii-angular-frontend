import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  actionSchoolsDataPointsNoop,
  actionSchoolsDataPointsRetrieve,
  actionSchoolsDataPointsRetrieveError, actionSchoolsDataPointsRetrieveStatic,
  actionSchoolsDataPointsSuccess,
} from './schools.actions';
import {of} from 'rxjs';
import {SchoolsService} from '../schools.service';

@Injectable()
export class SchoolsEffects {
  constructor(
    private actions$: Actions,
    private schoolsService: SchoolsService,
  ) {}

  retrieve = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSchoolsDataPointsRetrieve),
        switchMap((action) =>
         this.schoolsService.getScenarioData().pipe(
           map((scenarioData) => {
             if (scenarioData) {
               return actionSchoolsDataPointsSuccess({scenarioData})
             } else {
               return actionSchoolsDataPointsNoop();
             }
           }),
           catchError((error) => of(actionSchoolsDataPointsRetrieveStatic()))
         )
        )
      )
  );

  retrieveStatic = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSchoolsDataPointsRetrieveStatic),
        switchMap((action) =>
          this.schoolsService.getScenarioDataStatic().pipe(
            map((scenarioData) => actionSchoolsDataPointsSuccess({scenarioData})),
            catchError((error) => of(actionSchoolsDataPointsRetrieveError({ error })))
          )
        )
      )
  );
}
