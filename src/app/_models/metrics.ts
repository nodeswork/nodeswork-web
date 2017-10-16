import * as metricsDef      from '@nodeswork/utils/dist/metrics/def';

export type MetricsData = metricsDef.MetricsData;

export interface NVDataPoint {
  label: number;
  value: number;
}

export interface NVSeries {
  key:     string;
  values:  NVDataPoint[];
}
