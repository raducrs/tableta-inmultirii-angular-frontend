import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.model';

export const HOME = 'HOME';
export const selectFeature = createFeatureSelector<HomeState>(HOME);

export const selectLatestSchoolPoint = createSelector(
  selectFeature,
  (state: HomeState) => state.latest
);

export const selectGadgetStats = createSelector(
  selectFeature,
  (state: HomeState) => state.gadgets
);
