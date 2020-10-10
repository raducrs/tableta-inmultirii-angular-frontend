import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {
  AcceptedDonationState,
  Donation,
  DonationsState, ExtendedDonation,
  LocationDonationState,
  TargetedDonationState
} from './puser.model';
import {
  actionADonationAccept, actionADonationReject, actionADonationRejectError, actionADonationRejectSuccess,
  actionADonationRetrieve,
  actionADonationRetrieveError,
  actionADonationRetrieveSuccess,
  actionADonationsRetrieve,
  actionADonationsRetrieveError,
  actionADonationsRetrieveSuccess,
  actionADonationStatusError,
  actionADonationStatusSuccess,
  actionADonationStatusUpdate, actionDonationsClear,
  actionLDonationAccept,
  actionLDonationAcceptError,
  actionLDonationAcceptSuccess,
  actionLDonationAcceptTakenError,
  actionLDonationReject,
  actionLDonationRejectError,
  actionLDonationRejectSuccess,
  actionLDonationsRetrieve,
  actionLDonationsRetrieveError,
  actionLDonationsRetrieveSuccess,
  actionTDonationAccept,
  actionTDonationAcceptError,
  actionTDonationAcceptSuccess,
  actionTDonationReject,
  actionTDonationRejectError,
  actionTDonationRejectSuccess,
  actionTDonationsRetrieve,
  actionTDonationsRetrieveError,
  actionTDonationsRetrieveSuccess
} from './puser.actions';
import {Laptop, LocationPacked} from '../../donate/state/donation.model';


// @TODO add initial sorting by time
export const tDonationsAdapter: EntityAdapter<Donation> = createEntityAdapter<Donation>({});
export const lDonationsAdapter: EntityAdapter<Donation> = createEntityAdapter<Donation>({});
export const aDonationsAdapter: EntityAdapter<ExtendedDonation> = createEntityAdapter<ExtendedDonation>({});

export const initialState: DonationsState = {
  targeted: tDonationsAdapter.getInitialState({
    ids: [],
    entities: {},
    error: null
  }),
  location : lDonationsAdapter.getInitialState({
    ids: [],
    entities: {},
    error: null
  }),
  accepted : aDonationsAdapter.getInitialState({
    ids: [], // ['3', '4', '5', '6'],
    entities: [],
    //   {
    //   '3': { id: '3',
    //     loc : {locationId: '1',
    //       name: 'Craiova, jud. Dolj',
    //       address: 'Oriunde',
    //       category: 0} as unknown as LocationPacked,
    //     gadget: { gadgetType: 'laptop',
    //       laptop: {
    //         make: 'Asus',
    //         year: '2020',
    //         functional: true,
    //         clean: true,
    //         access: true } as unknown as Laptop
    //     },
    //     user: {
    //       registeredUser: false,
    //     },
    //     status: 'accepted'
    //   } as ExtendedDonation,
    //
    //   '4': { id: '4',
    //     loc : {locationId: '1',
    //       name: 'Craiova, jud. Dolj',
    //       address: 'Oriunde',
    //       category: 0} as unknown as LocationPacked,
    //     gadget: { gadgetType: 'laptop',
    //       laptop: {
    //         make: 'Asus',
    //         year: '2019',
    //         functional: true,
    //         clean: true,
    //         access: true } as unknown as Laptop
    //     },
    //     user: {
    //       registeredUser: false,
    //     },
    //     status: 'contact-shown'
    //   } as ExtendedDonation,
    //
    //   '5': { id: '5',
    //     loc : {locationId: '1',
    //       name: 'Craiova, jud. Dolj',
    //       address: 'Oriunde',
    //       category: 0} as unknown as LocationPacked,
    //     gadget: { gadgetType: 'laptop',
    //       laptop: {
    //         make: 'Asus',
    //         year: '2019',
    //         functional: true,
    //         clean: true,
    //         access: true } as unknown as Laptop
    //     },
    //     user: {
    //       registeredUser: false,
    //     },
    //     status: 'contacted'
    //   } as ExtendedDonation,
    //
    //   '6': { id: '6',
    //     loc : {locationId: '1',
    //       name: 'Craiova, jud. Dolj',
    //       address: 'Oriunde',
    //       category: 0} as unknown as LocationPacked,
    //     gadget: { gadgetType: 'laptop',
    //       laptop: {
    //         make: 'Asus',
    //         year: '2019',
    //         functional: true,
    //         clean: true,
    //         access: true } as unknown as Laptop
    //     },
    //     user: {
    //       registeredUser: false,
    //     },
    //     status: 'given'
    //   } as ExtendedDonation,
    // },
    error: null
  }),
};

export const donationReducer = createReducer(
  initialState,
  on(actionTDonationsRetrieve, (state) => ({
    ...state,
    targeted: {
      ...state.targeted,
      error: null
    }
  }) ),
  on(actionTDonationsRetrieveSuccess, (state, { donations }) => ({
    ...state,
    targeted: {
      ...tDonationsAdapter.upsertMany<TargetedDonationState>(donations, state.targeted) ,
      error: null
    }
  })),
  on(actionTDonationsRetrieveError, (state, { error }) =>
    ( {...state,
      targeted: {
        ...state.targeted,
        error: error
      }
    })
  ),

  // accept
  on(actionTDonationAccept, (state, {donation}) => ({
    ...state,
    targeted: {
      ...state.targeted,
      error: null
    }
  })),
  on(actionTDonationAcceptSuccess, (state, { donation }) => ({
    ...state,
    targeted: {
      ...tDonationsAdapter.removeOne<TargetedDonationState>(donation.id, state.targeted) ,
      error: null
    }
  })),
  on(actionTDonationAcceptError, (state, { error }) =>
    ( {...state,
      targeted: {
        ...state.targeted,
        error: error
      }
    })
  ),

  // reject
  on(actionTDonationReject, (state, {donation}) => ({
    ...state,
    targeted: {
      ...state.targeted,
      error: null
    }
  })),
  on(actionTDonationRejectSuccess, (state, { donation }) => ({
    ...state,
    targeted: {
      ...tDonationsAdapter.removeOne<TargetedDonationState>(donation.id, state.targeted) ,
      error: null
    }
  })),
  on(actionTDonationRejectError, (state, { error }) =>
    ( {...state,
      targeted: {
        ...state.targeted,
        error: error
      }
    })
  ),

  // STATE LOCATION

  on(actionLDonationsRetrieve, (state) => ({
    ...state,
    location: {
      ...state.location,
      error: null
    }
  }) ),
  on(actionLDonationsRetrieveSuccess, (state, { donations }) => ({
    ...state,
    location: {
      ...lDonationsAdapter.upsertMany<LocationDonationState>(donations, state.location) ,
      error: null
    }
  })),
  on(actionLDonationsRetrieveError, (state, { error }) =>
    ( {...state,
      location: {
        ...state.location,
        error: error
      }
    })
  ),

  // accept
  on(actionLDonationAccept, (state, {donation}) => ({
    ...state,
    location: {
      ...state.location,
      error: null
    }
  })),
  on(actionLDonationAcceptSuccess, (state, { donation }) => ({
    ...state,
    location: {
      ...lDonationsAdapter.removeOne<LocationDonationState>(donation.id, state.location) ,
      error: null
    }
  })),
  on(actionLDonationAcceptError, (state, { error }) =>
    ( {...state,
      location: {
        ...state.location,
        error: error
      }
    })
  ),
  on(actionLDonationAcceptTakenError, (state, { error, donation }) =>
    ( {...state,
      location: {
        ...lDonationsAdapter.removeOne<LocationDonationState>(donation.id, state.location) ,
        error: error
      }
    })
  ),

  // reject
  on(actionLDonationReject, (state, {donation}) => ({
    ...state,
    location: {
      ...state.location,
      error: null
    }
  })),
  on(actionLDonationRejectSuccess, (state, { donation }) => ({
    ...state,
    location: {
      ...lDonationsAdapter.removeOne<LocationDonationState>(donation.id, state.targeted) ,
      error: null
    }
  })),
  on(actionLDonationRejectError, (state, { error }) =>
    ( {...state,
      location: {
        ...state.location,
        error: error
      }
    })
  ),

  // STATE ACCEPTED
  on(actionADonationsRetrieve, (state) => ({
    ...state,
    accepted: {
      ...state.accepted,
      error: null
    }
  }) ),
  on(actionADonationsRetrieveSuccess, (state, { donations }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.upsertMany<AcceptedDonationState>(donations, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationsRetrieveError, (state, { error }) =>
    ( {...state,
      accepted: {
        ...state.accepted,
        error: error
      }
    })
  ),

  // accept
  on(actionADonationAccept, (state, { donation }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.addOne<AcceptedDonationState>(donation, state.accepted) ,
      error: null
    }
  })),

  on(actionADonationRetrieve, (state, { id }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.upsertOne<AcceptedDonationState>({id, isLoading: true}, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationRetrieveSuccess, (state, { id, details }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.upsertOne<AcceptedDonationState>({ id, isLoading: false, details}, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationRetrieveError, (state, { id, error }) =>
    ( {...state,
      accepted: {
        ...aDonationsAdapter.upsertOne<AcceptedDonationState>({id, isLoading: false}, state.accepted) ,
        error: error
      }
    })
  ),

  // status update
  on(actionADonationStatusUpdate, (state, { id }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.upsertOne<AcceptedDonationState>({id, isLoading: true}, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationStatusSuccess, (state, { id, status }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.upsertOne<AcceptedDonationState>({ id, isLoading: false, status}, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationStatusError, (state, { id, error }) =>
    ( {...state,
      accepted: {
        ...aDonationsAdapter.upsertOne<AcceptedDonationState>({id, isLoading: false}, state.accepted) ,
        error: error
      }
    })
  ),


  // reject
  on(actionADonationReject, (state, { id }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.upsertOne<AcceptedDonationState>({id}, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationRejectSuccess, (state, { id }) => ({
    ...state,
    accepted: {
      ...aDonationsAdapter.removeOne<AcceptedDonationState>(id, state.accepted) ,
      error: null
    }
  })),
  on(actionADonationRejectError, (state, { error }) =>
    ( {...state,
      accepted: {
        ...state.accepted ,
        error: error
      }
    })
  ),


  // FOR ALL
  on(actionDonationsClear, (state) =>
    ( {...state,
      accepted: {
        ...aDonationsAdapter.removeAll(state.accepted),
        error: null
      },
      location: {
        ...lDonationsAdapter.removeAll(state.location),
        error: null
      },
      targeted: {
        ...tDonationsAdapter.removeAll(state.targeted),
        error: null
      }
    })
  ),
);
