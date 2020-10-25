import { EntityState } from '@ngrx/entity';
import {Gadgets, LocationPacked} from '../../donate/state/donation.model';
import {SchoolDataPoint, Source} from '../scenario-data';

export interface LastUpdate {
  lastUpdateSource: Source;
}

export interface Error{
  error: any;
}

export interface Loading{
  isLoading: boolean;
}

export interface SchoolPointsState extends EntityState<SchoolDataPoint>, Error, Loading, LastUpdate {}
