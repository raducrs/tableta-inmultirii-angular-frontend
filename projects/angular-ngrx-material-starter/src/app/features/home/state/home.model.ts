export interface SchoolStatistic {
  name: string;
  count: number;
}

export interface SchoolStatistics {
  red: SchoolStatistic;
  yellow: SchoolStatistic;
  green: SchoolStatistic;
}

export interface SchoolDataPoint {
  stats: SchoolStatistics;
  date: string;
}

export interface GadgetsStats {
  l: number;
  t: number;
  p: number;
}

export interface HomeState {
  gadgets: GadgetsStats;
  latest: SchoolDataPoint;
}
