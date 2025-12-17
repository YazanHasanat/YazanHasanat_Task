import type { Dataset } from "../types/dataset";

export const MOCK_DATASETS: Dataset[] = [
  {
    id: "ds_1",
    name: "Production API",
    status: "active", 
    description: "Main production metrics",
    fields: ["REQUESTS", "ERRORS", "P50_LATENCY", "P95_LATENCY", "P99_LATENCY"]
  },
  {
    id: "ds_2",
    name: "Staging API",
    status: "inactive",
    description: "Pre-production metrics",
    fields: ["REQUESTS", "ERRORS", "P50_LATENCY", "P95_LATENCY"]
  },
  {
    id: "ds_3",
    name: "Legacy System",
    status: "archived",
    description: "Old legacy metrics",
    fields: ["REQUESTS", "ERRORS"]
  },
];
