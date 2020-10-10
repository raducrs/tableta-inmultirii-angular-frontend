import {createAction, props} from '@ngrx/store';
import {Donation, DonationDetails, ExtendedDonation} from './puser.model';

export const actionTDonationsRetrieve = createAction(
  '[PUser] TDonations Retrieve'
);

export const actionTDonationsRetrieveSuccess = createAction(
  '[PUser] TDonations Retrieve Success',
  props<{donations: Donation[]}>()
);

export const actionTDonationsRetrieveError = createAction(
  '[PUser] TDonations Retrieve Error',
  props<{error: any}>()
);

export const actionTDonationAccept = createAction(
  '[PUser] TDonations Accept',
  props<{donation: Donation}>()
);

export const actionTDonationAcceptSuccess = createAction(
  '[PUser] TDonations Accept Success',
  props<{donation: Donation}>()
);

export const actionTDonationAcceptError = createAction(
  '[PUser] TDonations Accept Error',
  props<{error: any}>()
);

export const actionTDonationReject = createAction(
  '[PUser] TDonations Reject',
  props<{donation: Donation}>()
);

export const actionTDonationRejectSuccess = createAction(
  '[PUser] TDonations Reject Success',
  props<{donation: Donation}>()
);

export const actionTDonationRejectError = createAction(
  '[PUser] TDonations Reject Error',
  props<{error: any}>()
);

// Location donations

export const actionLDonationsRetrieve = createAction(
  '[PUser] LDonations Retrieve'
);

export const actionLDonationsRetrieveSuccess = createAction(
  '[PUser] LDonations Retrieve Success',
  props<{donations: Donation[]}>()
);

export const actionLDonationsRetrieveError = createAction(
  '[PUser] LDonations Retrieve Error',
  props<{error: any}>()
);

export const actionLDonationAccept = createAction(
  '[PUser] LDonations Accept',
  props<{donation: Donation}>()
);

export const actionLDonationAcceptSuccess = createAction(
  '[PUser] LDonations Accept Success',
  props<{donation: Donation}>()
);

export const actionLDonationAcceptError = createAction(
  '[PUser] LDonations Accept Error',
  props<{error: any}>()
);

export const actionLDonationAcceptTakenError = createAction(
  '[PUser] LDonations Accept Taken Error',
  props<{error: any, donation: Donation}>()
);

export const actionLDonationReject = createAction(
  '[PUser] LDonations Reject',
  props<{donation: Donation}>()
);

export const actionLDonationRejectSuccess = createAction(
  '[PUser] LDonations Reject Success',
  props<{donation: Donation}>()
);

export const actionLDonationRejectError = createAction(
  '[PUser] LDonations Reject Error',
  props<{error: any}>()
);


// Accepted donations
export const actionADonationsRetrieve = createAction(
  '[PUser] ADonations Retrieve'
);

export const actionADonationsRetrieveSuccess = createAction(
  '[PUser] ADonations Retrieve Success',
  props<{donations: Donation[]}>()
);

export const actionADonationsRetrieveError = createAction(
  '[PUser] ADonations Retrieve Error',
  props<{error: any}>()
);

export const actionADonationAccept = createAction(
  '[PUser] ADonations Accept',
  props<{donation: ExtendedDonation}>()
);

export const actionADonationRetrieve = createAction(
  '[PUser] ADonation Retrieve',
  props<{id: string}>()
);

export const actionADonationRetrieveSuccess = createAction(
  '[PUser] ADonation Retrieve Success',
  props<{id: string, details: DonationDetails}>()
);

export const actionADonationRetrieveError = createAction(
  '[PUser] ADonation Retrieve Error',
  props<{id: string, error: any}>()
);

export const actionADonationShowContact = createAction(
  '[PUser] ADonation ShowContact',
  props<{id: string}>()
);

export const actionADonationStatusUpdate = createAction(
  '[PUser] ADonation StatusUpdate',
  props<{id: string, status: string}>()
);


export const actionADonationStatusSuccess = createAction(
  '[PUser] ADonation Status Success',
  props<{id: string, status: string}>()
);

export const actionADonationStatusError = createAction(
  '[PUser] ADonation Status Error',
  props<{id: string, error: any}>()
);

export const actionADonationReject = createAction(
  '[PUser] ADonation Reject',
  props<{id: string}>()
);


export const actionADonationRejectSuccess = createAction(
  '[PUser] ADonation Reject Success',
  props<{id: string }>()
);

export const actionADonationRejectError = createAction(
  '[PUser] ADonation Reject Error',
  props<{ error: any}>()
);


// FOR ALL
export const actionDonationsClear = createAction(
  '[PUser] Donations Clear'
);



