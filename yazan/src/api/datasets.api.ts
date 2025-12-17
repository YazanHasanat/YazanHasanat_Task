import { MOCK_DATASETS } from "../mock/datasets.mock";
import type { GetDatasetsRequest, GetDatasetsResponse } from "../types/dataset";

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getDatasets(
  params: GetDatasetsRequest
): Promise<GetDatasetsResponse> {
  await delay(600);  

  let datasets = [...MOCK_DATASETS];

  if (params.search) {
    const q = params.search.toLowerCase();
    datasets = datasets.filter((d) =>
      d.name.toLowerCase().includes(q)
    );
  }

  if (params.status && params.status !== "all") {
    datasets = datasets.filter(
      (d) => d.status === params.status
    );
  }

  return { datasets };
}
