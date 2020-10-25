import {createFeatureSelector, createSelector} from '@ngrx/store';
import {schoolPointsAdapter} from './schools.reducers';
import {SchoolPointsState} from './schools.model';


export const SCHOOLS = 'SCHOOLS';
export const selectSchoolState = createFeatureSelector<SchoolPointsState>(SCHOOLS);

export const selectSchoolPointsState = createSelector(
  selectSchoolState,
  (state: SchoolPointsState) => state
);

const { selectEntities, selectAll } = schoolPointsAdapter.getSelectors();

export const selectSchoolPoints = createSelector(selectSchoolPointsState, selectAll);
export const selectSchoolPointsEntities = createSelector(selectSchoolPointsState, selectEntities);

export const selectSchoolsError = createSelector(
  selectSchoolState,
  (state: SchoolPointsState) => state.error
);

export const selectSchoolsLoading = createSelector(
  selectSchoolState,
  (state: SchoolPointsState) => state.isLoading
);

export const selectLatestSource = createSelector(
  selectSchoolState,
  (state: SchoolPointsState) => state.lastUpdateSource
);




