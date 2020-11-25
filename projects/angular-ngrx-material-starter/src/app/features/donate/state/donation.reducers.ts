import {Donation, DonationState, DonationUser, Laptop, LocationPacked, Tablet} from './donation.model';
import {createReducer, on} from '@ngrx/store';
import {
  actionDonationPost, actionDonationPostError, actionDonationPostSuccess, actionGadgetClear,
  actionGadgetTypeUpdate,
  actionLaptopUpdate, actionLocationDelete,
  actionLocationUpdate,
  actionPhoneUpdate,
  actionTabletUpdate,
  actionUserUpdate
} from './donation.actions';
import {environment} from '../../../../environments/environment';

const fullTest = environment.production;

export const initialState: DonationState = {
  donation: fullTest ? { loc : {} as LocationPacked, gadget: { gadgetType: undefined, laptop: {}  as Laptop}, user: {} as DonationUser} as Donation
          : { loc : {locationId: '1', name: 'Craiova, jud. Dolj', address: 'Oriunde', category: 0} as unknown as LocationPacked, gadget: { gadgetType: 'laptop', laptop: {make: 'Asus', year: '2020', functional: true, clean: true, access: true } as unknown as Laptop}} as Donation,
  loading : false,
  ready: false,
  error: null,
};

export const donationReducer = createReducer(
  initialState,
  on(actionGadgetTypeUpdate, (state, { gadgetType }): DonationState => ({
    ...state,
    donation: {
      gadget : {
        gadgetType: gadgetType,
        laptop: { ...state.donation.gadget.laptop },
        tablet: { ...state.donation.gadget.tablet},
        phone: { ...state.donation.gadget.phone},
      },
      loc: {...state.donation.loc },
      user : {...state.donation.user}
    }})),
  on(actionLaptopUpdate, (state, { laptop }): DonationState => ({
    ...state,
    donation: {
      gadget : {
        gadgetType: state.donation.gadget?.gadgetType,
        laptop: { ...state.donation.gadget.laptop, ...laptop },
        tablet: { ...state.donation.gadget.tablet},
        phone: { ...state.donation.gadget.phone},
      },
      loc: {...state.donation.loc },
      user : {...state.donation.user}
    }})),
  on(actionTabletUpdate, (state, { tablet }): DonationState => ({
    ...state,
    donation: {
      gadget : {
        gadgetType: state.donation.gadget?.gadgetType,
        tablet: { ...state.donation.gadget.tablet, ...tablet },
        laptop: { ...state.donation.gadget.laptop},
        phone: { ...state.donation.gadget.phone},
      },
      loc: {...state.donation.loc },
      user : {...state.donation.user}
    }})),
  on(actionPhoneUpdate, (state, { phone }): DonationState => ({
    ...state,
    donation: {
      gadget : {
        gadgetType: state.donation.gadget?.gadgetType,
        phone: { ...state.donation.gadget.phone, ...phone },
        tablet: { ...state.donation.gadget.tablet},
        laptop: { ...state.donation.gadget.laptop},
      },
      loc: {...state.donation.loc },
      user : {...state.donation.user}
    }})),
  on(actionGadgetClear, (state): DonationState => ({
    ...state,
    donation: {
      gadget : {
        gadgetType: undefined,
        phone: { } as Laptop,
        tablet: { } as Tablet,
        laptop: { } as Laptop,
      },
      loc: {...state.donation.loc },
      user : {...state.donation.user}
    }})),
  on(actionLocationUpdate, (state, { location }): DonationState => ({
    ...state,
    donation: {
      loc: location,
    gadget: {...state.donation.gadget },
    user : {...state.donation.user}
    }})),
  on(actionLocationDelete, (state): DonationState => ({
  ...state,
  donation: {
    loc: {} as LocationPacked,
    gadget: {...state.donation.gadget },
    user : {...state.donation.user}
  }})),
  on(actionUserUpdate, (state, { user}): DonationState => ({
    ...state,
    donation: {
      loc: {...state.donation.loc },
      gadget: {...state.donation.gadget },
      user : {...user}
    }})),
  on(actionDonationPost, (state, { donation}): DonationState => ({
    ...state,
    loading : true,
    ready: false,
    error: null
    })),
  on(actionDonationPostSuccess, (state): DonationState => ({
    ...state,
    loading : false,
    ready: true,
    error: null
  })),
  on(actionDonationPostError, (state, { error }): DonationState => ({
    ...state,
    loading : false,
    ready: false,
    error
  }))
);
