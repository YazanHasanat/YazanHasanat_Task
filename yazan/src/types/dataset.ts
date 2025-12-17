export type DatasetStatus = "active" | "inactive" | "archived";

export interface Dataset {
  id: string;
  name: string;
  status: DatasetStatus;
  description: string;
  fields: string[];
}

export interface GetDatasetsRequest {
  search?: string;
  status?: DatasetStatus | "all";
}

export interface GetDatasetsResponse {
  datasets: Dataset[];
}
