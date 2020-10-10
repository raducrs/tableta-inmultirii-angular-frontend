import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AcceptedDonationState, DonationsState, LocationDonationState, TargetedDonationState} from './puser.model';
import {aDonationsAdapter, lDonationsAdapter, tDonationsAdapter} from './puser.reducers';


export const PUSER = 'PUSER';
export const selectDonationState = createFeatureSelector<DonationsState>(PUSER);

export const selectTDonationState = createSelector(
  selectDonationState,
  (state: DonationsState) => state.targeted
);

const { selectEntities, selectAll } = tDonationsAdapter.getSelectors();

export const selectTAllDonations = createSelector(selectTDonationState, selectAll);
export const selectTDonationEntities = createSelector(selectTDonationState, selectEntities);

export const selectTError = createSelector(
  selectTDonationState,
  (state: TargetedDonationState) => state.error
);

// LOCATION

export const selectLDonationState = createSelector(
  selectDonationState,
  (state: DonationsState) => state.location
);

export const selectLAllDonations = createSelector(selectLDonationState, lDonationsAdapter.getSelectors().selectAll);
export const selectLDonationEntities = createSelector(selectLDonationState, lDonationsAdapter.getSelectors().selectEntities);


export const selectLError = createSelector(
  selectLDonationState,
  (state: LocationDonationState) => state.error
);

// ACCEPTED

export const selectADonationState = createSelector(
  selectDonationState,
  (state: DonationsState) => state.accepted
);

export const selectAAllDonations = createSelector(selectADonationState, aDonationsAdapter.getSelectors().selectAll);
export const selectADonationEntities = createSelector(selectADonationState, aDonationsAdapter.getSelectors().selectEntities);


export const selectAError = createSelector(
  selectADonationState,
  (state: AcceptedDonationState) => state.error
);


export const selectDonationDetails = createSelector(
  selectADonationEntities,
  (entities, props) => entities[props.id]
);

export const selectDonationLoading = createSelector(
  selectADonationEntities,
  (entities, props) => entities[props.id]?.isLoading
);



