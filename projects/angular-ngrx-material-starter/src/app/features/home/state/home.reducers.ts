import { createReducer, on } from '@ngrx/store';
import { GadgetsStats, HomeState, SchoolDataPoint } from './home.model';
import {
  actionHomeLatestSuccess,
  actionStatGadgetsSuccess
} from './home.actions';

export const initialState: HomeState = {
  latest: {} as SchoolDataPoint,
  gadgets: {} as GadgetsStats
};

export const homeReducer = createReducer(
  initialState,
  on(actionHomeLatestSuccess, (state, { latest }) => ({
    ...state,
    latest: { ...latest }
  })),
  on(actionStatGadgetsSuccess, (state, { gadgets }) => ({
    ...state,
    gadgets: { ...gadgets }
  }))
);
