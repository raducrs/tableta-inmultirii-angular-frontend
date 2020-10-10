import { EntityState } from '@ngrx/entity';
import {Gadgets, LocationPacked} from '../../donate/state/donation.model';

export interface Donation {
  id: string;
  status: string;
  gadget?: Gadgets,
  loc?: LocationPacked,
}

export interface Error{
  error: any;
}

export interface DonationsState extends EntityState<Donation>, Error {}
