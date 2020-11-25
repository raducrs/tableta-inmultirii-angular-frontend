import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Donation, DonationsState} from './duser.model';
import {actionDonationsClear, actionDonationsRetrieveError, actionDonationsRetrieveSuccess} from './duser.actions';


export const donationsAdapter: EntityAdapter<Donation> = createEntityAdapter<Donation>({});

export const initialState: DonationsState = donationsAdapter.getInitialState({
  ids: [],
  entities: {},
  error: null
});

export const donationReducer = createReducer(
  initialState,
  on(actionDonationsRetrieveSuccess, (state, { donations }) =>
    donationsAdapter.upsertMany(donations, state)
  ),
  on(actionDonationsRetrieveError, (state, { error }) =>
    ( {...state, error: error})
  ),
  on(actionDonationsClear, (state) =>
    ( {...donationsAdapter.removeAll(state), error: null})
  )
);
