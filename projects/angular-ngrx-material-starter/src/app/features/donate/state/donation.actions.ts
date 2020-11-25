import {createAction, props} from '@ngrx/store';
import {Donation, DonationUser, Laptop, LocationPacked, Phone, Tablet} from './donation.model';

export const actionGadgetTypeUpdate = createAction(
  '[Donation] Gadget Type Update',
  props<{ gadgetType: string }>()
);

export const actionGadgetClear = createAction(
  '[Donation] Gadget Clear'
);

export const actionLaptopUpdate = createAction(
  '[Donation] Laptop Update',
  props<{ laptop: Laptop }>()
);

export const actionTabletUpdate = createAction(
  '[Donation] Tablet Update',
  props<{ tablet: Tablet }>()
);

export const actionPhoneUpdate = createAction(
  '[Donation] Phone Update',
  props<{ phone: Phone }>()
);

export const actionLocationUpdate = createAction(
  '[Donation] Location Update',
  props<{ location: LocationPacked }>()
);

export const actionLocationDelete = createAction(
  '[Donation] Location Delete'
);

export const actionUserUpdate = createAction(
  '[Donation] User Update',
  props<{user: DonationUser}>()
);

export const actionUserUpdateFromLogin = createAction(
  '[Donation] User Update From Login'
);

export const actionDonationPost = createAction(
  '[Donation] Donation Post',
  props<{donation: Donation}>()
);

export const actionDonationPostSuccess = createAction(
  '[Donation] Donation Post Success'
);


export const actionDonationPostError = createAction(
  '[Donation] Donation Post Error',
  props<{ error: any}>()
);


