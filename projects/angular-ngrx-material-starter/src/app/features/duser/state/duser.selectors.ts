import {createFeatureSelector, createSelector} from '@ngrx/store';
import {donationsAdapter} from './duser.reducers';
import {ExamplesState, FEATURE_NAME, selectExamples, State} from '../../examples/examples.state';
import {DonationsState} from './duser.model';


export const DUSER = 'DUSER';
export const selectDonationState = createFeatureSelector<DonationsState>(DUSER);

const { selectEntities, selectAll } = donationsAdapter.getSelectors();

export const selectAllDonations = createSelector(selectDonationState, selectAll);
export const selectDonationEntities = createSelector(selectDonationState, selectEntities);

export const selectError = createSelector(
  selectDonationState,
  (state: DonationsState) => state.error
);



