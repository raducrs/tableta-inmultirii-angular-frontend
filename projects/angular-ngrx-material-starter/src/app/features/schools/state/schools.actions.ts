import {createAction, props} from '@ngrx/store';
import {ScenarioData} from '../scenario-data';

export const actionSchoolsDataPointsRetrieve = createAction(
  '[Schools] Points Retrieve'
);

export const actionSchoolsDataPointsNoop = createAction(
  '[Schools] Points NOOP Etag Retrieve'
);


export const actionSchoolsDataPointsRetrieveStatic = createAction(
  '[Schools] Points Retrieve Static'
);

export const actionSchoolsDataPointsSuccess = createAction(
  '[Schools] Points Retrieve Success',
  props<{scenarioData: ScenarioData}>()
);

export const actionSchoolsDataPointsRetrieveError = createAction(
  '[Schools] Points Retrieve Error',
  props<{error: any}>()
);




