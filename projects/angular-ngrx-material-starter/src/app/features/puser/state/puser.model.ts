import { EntityState } from '@ngrx/entity';
import {DonationUser, Gadgets, LocationPacked} from '../../donate/state/donation.model';

export interface Donation {
  id: string;
  gadget?: Gadgets,
  loc?: LocationPacked,
  user?: DonationUser
}
export interface DonationDetails {
  user? : DonationUser,
  lastContact?: string
}
export interface ExtendedDonation extends Donation {
  status?: string;
  isLoading?: boolean;
  details? : DonationDetails
}

export interface Error{
  error?: any;
}


export interface TargetedDonationState extends EntityState<Donation>, Error {}
export interface LocationDonationState extends EntityState<Donation>, Error {}
export interface AcceptedDonationState extends EntityState<ExtendedDonation>, Error {}

export interface DonationsState {
  targeted : TargetedDonationState,
  location: LocationDonationState,
  accepted: AcceptedDonationState,
}
