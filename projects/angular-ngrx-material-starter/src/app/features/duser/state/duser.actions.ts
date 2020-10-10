import {createAction, props} from '@ngrx/store';
import {Donation} from './duser.model';

export const actionDonationsRetrieve = createAction(
  '[DUser] Donations Retrieve'
);

export const actionDonationsRetrieveSuccess = createAction(
  '[DUser] Donations Retrieve Success',
  props<{donations: Donation[]}>()
);

export const actionDonationsRetrieveError = createAction(
  '[DUser] Donations Retrieve Error',
  props<{error: any}>()
);

export const actionDonationsClear = createAction(
  '[DUser] Donations Clear'
);



