import { createAction, props } from '@ngrx/store';
import { GadgetsStats, SchoolDataPoint } from './home.model';

export const actionHomeLatestRetrieve = createAction(
  '[Home] Home Latest Retrieve'
);

export const actionHomeLatestNoop = createAction(
  '[Home] Home Latest NOOP Etag Retrieve'
);

export const actionHomeLatestRetrieveStatic = createAction(
  '[Home] Home Latest Retrieve Static'
);

export const actionHomeLatestSuccess = createAction(
  '[Home] Home Latest Retrieve Success',
  props<{ latest: SchoolDataPoint }>()
);

export const actionHomeLatestRetrieveError = createAction(
  '[Home] Home Latest Retrieve Error',
  props<{ error: any }>()
);

export const actionStatGadgetsRetrieve = createAction(
  '[Home] Home Stat Gadgets Retrieve'
);

export const actionStatGadgetstNoop = createAction(
  '[Home] Home Stat Gadgets NOOP Etag Retrieve'
);

export const actionStatGadgetsRetrieveStatic = createAction(
  '[Home] Home Stat Gadgets Retrieve Static'
);

export const actionStatGadgetsSuccess = createAction(
  '[Home] Home Stat Gadgets Retrieve Success',
  props<{ gadgets: GadgetsStats }>()
);

export const actionStatGadgetsRetrieveError = createAction(
  '[Home] Home Stat Gadgets Retrieve Error',
  props<{ error: any }>()
);
