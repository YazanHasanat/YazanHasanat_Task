import type { MetricField, MetricsDatapoint } from "../types/metrics";

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMetrics(
  from: number,
  to: number,
  fields: MetricField[]
): MetricsDatapoint[] {
  const datapoints: MetricsDatapoint[] = [];
  const step = 60 * 1000;

  for (let t = from; t <= to; t += step) {
    const point: MetricsDatapoint = { timestamp: t };

    fields.forEach((field) => {
      point[field] =
        field.includes("LATENCY")
          ? random(20, 300)
          : random(0, 2000);
    });

    datapoints.push(point);
  }

  return datapoints;
}
