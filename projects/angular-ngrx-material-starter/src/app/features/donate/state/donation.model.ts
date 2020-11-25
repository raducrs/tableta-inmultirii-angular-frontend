export interface MakeModel {
  model: string,
  make: string,
  year: string,
}

export interface Compliant {
  functional: boolean,
  clean: boolean,
  access: boolean
}

export interface GadgetFeature {
  screen: string,
  memory: string,
  processor: string
}

export interface Laptop extends MakeModel, Compliant, GadgetFeature {
}

export interface Tablet extends MakeModel, Compliant {
  screen: string
}

export interface Phone extends MakeModel, Compliant {
  screen: string
}

export interface Gadgets{
  gadgetType: string,
  laptop: Laptop,
  tablet: Tablet,
  phone: Phone
}

export interface DonationUser {
  registeredUser: boolean
  name: string,
  email: string,
  phone: string
}

export interface LocationPacked {
  locationId: string;
  name: string;
  category: number;
  address: string;
}

export interface Donation {
  gadget?: Gadgets,
  loc?: LocationPacked,
  user?: DonationUser
}

export interface DonationState {
  donation: Donation,
  loading: boolean,
  ready: boolean,
  error: any
}


