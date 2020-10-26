import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { SchoolPointsState } from './schools.model';
import {
  actionSchoolsDataPointsNoop,
  actionSchoolsDataPointsRetrieve,
  actionSchoolsDataPointsRetrieveError,
  actionSchoolsDataPointsSuccess
} from './schools.actions';
import { SchoolDataPoint } from '../scenario-data';
import * as moment from 'moment';

export function selectDate(s: SchoolDataPoint): string {
  // if (s.date instanceof String){
  //   return s.date as string;
  // }
  // if (s.date.dayOfMonth) {
  //   return `${s.date.year}-${s.date.monthValue}-${s.date.dayOfMonth}`;
  // }
  // if (s.date instanceof Date){
  //   return `${s.date.getFullYear()}-${s.date.getMonth()}-${s.date.getDay()}`
  // }
  return s.date;
}

export function converToDateobject(obj: any) {
  if (obj instanceof Date) {
    return obj;
  }
  if (obj.dayOfMonth) {
    return new Date(obj.year, obj.monthValue, obj.dayOfMonth, 12, 0, 0);
  }
  if (obj instanceof String) {
    return moment(obj as string, 'YYYY-MM-DD').toDate();
  }

  return undefined;
}

export function sortByDate(a: SchoolDataPoint, b: SchoolDataPoint): number {
  // return converToDateobject(a.date).getTime() - converToDateobject(b.date).getTime();
  return a.date.localeCompare(b.date);
}

export const schoolPointsAdapter: EntityAdapter<SchoolDataPoint> = createEntityAdapter<
  SchoolDataPoint
>({
  selectId: selectDate,
  sortComparer: sortByDate
});

export const initialState: SchoolPointsState = schoolPointsAdapter.getInitialState(
  {
    ids: [],
    entities: {},
    error: null,
    isLoading: false,
    lastUpdateSource: null
  }
);

export const schoolPointsReducer = createReducer(
  initialState,
  on(actionSchoolsDataPointsRetrieve, (state) => ({
    ...state,
    isLoading: true
  })),
  on(actionSchoolsDataPointsSuccess, (state, { scenarioData }) => ({
    ...state,
    ...schoolPointsAdapter.upsertMany(scenarioData.data, state),
    isLoading: false,
    error: null,
    lastUpdateSource: scenarioData.lastUpdateSource
  })),
  on(actionSchoolsDataPointsRetrieveError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(actionSchoolsDataPointsNoop, (state) => ({
    ...state,
    isLoading: false
  }))
);
