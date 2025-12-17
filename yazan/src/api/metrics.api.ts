import type {
  MetricsParams,
  MetricsResponse,
} from "../types/metrics";
import { generateMetrics } from "../mock/metrics.mock";

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getMetrics(
  params: MetricsParams
): Promise<MetricsResponse> {
  await delay(700);

  const datapoints = generateMetrics(
    params.from,
    params.to,
    params.fields
  );

  return {
    dataset_id: params.datasetId,
    from: params.from,
    to: params.to,
    datapoints,
  };
}
