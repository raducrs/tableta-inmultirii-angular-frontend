

export interface Source{
  name: string;
  url: string;
  accessed: string;
}

export interface SchoolStatistic{
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
  source: Source;
  date: string;
  derived?: boolean;
}

export interface ScenarioData {
  lastUpdateSource: Source;
  data: SchoolDataPoint[];
}
