export type MetricField =
  | "REQUESTS"
  | "ERRORS"
  | "P50_LATENCY"
  | "P95_LATENCY"
  | "P99_LATENCY";

export interface MetricsParams {
  datasetId: string;
  from: number;   // timestamp
  to: number;     // timestamp
  fields: MetricField[];
}

export interface MetricsDatapoint {
  timestamp: number;
  [key: string]: number;
}

export interface MetricsResponse {
  dataset_id: string;
  from: number;
  to: number;
  datapoints: MetricsDatapoint[];
}
