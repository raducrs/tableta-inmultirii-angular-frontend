import {Donation, DonationState} from './donation.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export const DONATION = 'DONATION';

export const selectFeature = createFeatureSelector<DonationState>( DONATION );

export const selectGadgetType = createSelector(
  selectFeature,
  (state: DonationState) => state.donation?.gadget?.gadgetType
);

export const selectLaptop = createSelector(
  selectFeature,
  (state: DonationState) => state.donation?.gadget?.laptop
);

export const selectTablet = createSelector(
  selectFeature,
  (state: DonationState) => state.donation?.gadget?.tablet
);

export const selectPhone = createSelector(
  selectFeature,
  (state: DonationState) => state.donation?.gadget?.phone
);

export const selectLocation = createSelector(
  selectFeature,
  (state: DonationState) => state.donation?.loc
);

export const selectUser = createSelector(
  selectFeature,
  (state: DonationState) => state.donation?.user
);

export const selectDonation = createSelector(
  selectFeature,
  (state: DonationState) => state.donation
);

export const selectLoading = createSelector(
  selectFeature,
  (state: DonationState) => state.loading
);

export const selectError = createSelector(
  selectFeature,
  (state: DonationState) => state.error
);

export const selectReady = createSelector(
  selectFeature,
  (state: DonationState) => state.ready
);



