import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getMetrics } from "../../api/metrics.api";
import {
  getAnnotations,
  addAnnotation,
  deleteAnnotation,
} from "../../api/annotations.api";

import type {
  MetricField,
  MetricsDatapoint,
} from "../../types/metrics";
import type { Annotation } from "../../types/annotation";

import { TimeRangeSelector } from "./TimeRangeSelector";
import { AnnotationForm } from "../Annotations/AnnotationForm";
import { getTimeRange } from "../../utils/timeRange";

interface Props {
  datasetId: string;
  fields: MetricField[];
}

export function MetricsChart({ datasetId, fields }: Props) {
  /* -------------------- state -------------------- */
  const [range, setRange] = useState<"30m" | "2h" | "24h">("30m");
  const [data, setData] = useState<MetricsDatapoint[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -------------------- load metrics -------------------- */
  useEffect(() => {
    if (!datasetId) return;

    let cancelled = false;
    const { from, to } = getTimeRange(range);

    async function loadMetrics() {
      setLoading(true);
      setError(null);

      try {
        const res = await getMetrics({
          datasetId,
          from,
          to,
          fields,
        });

        if (!cancelled) {
          setData(res.datapoints);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load metrics"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMetrics();
    return () => {
      cancelled = true;
    };
  }, [datasetId, fields, range]);

  /* -------------------- load annotations -------------------- */
  useEffect(() => {
    if (!datasetId) return;
    getAnnotations(datasetId).then(setAnnotations);
  }, [datasetId]);

  /* -------------------- handlers -------------------- */
  async function handleAddAnnotation(text: string) {
    if (data.length === 0) return;

    const index = Math.floor(data.length / 2);
    const anchorTimestamp = data[index].timestamp;

    const annotation = await addAnnotation({
      datasetId,
      timestamp: anchorTimestamp,
      text,
    });

    setAnnotations((prev) => [...prev, annotation]);
  }

  async function handleDeleteAnnotation(id: string) {
    await deleteAnnotation(id);
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  }

  /* -------------------- render -------------------- */

  // 1️⃣ Empty state (no dataset)
  if (!datasetId) {
    return (
      <Paper
        elevation={2}
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          Select a dataset to view metrics
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        width: "100%",
        height: 480,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Typography variant="h6" gutterBottom>
        Metrics
      </Typography>

      {/* Controls */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={2}
      >
        <TimeRangeSelector value={range} onChange={setRange} />
        <AnnotationForm onAdd={handleAddAnnotation} />
      </Stack>

      {/* Loading */}
      {loading && (
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {/* Empty data */}
      {!loading && !error && data.length === 0 && (
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="text.secondary">
            No metrics available for the selected time range
          </Typography>
        </Box>
      )}

      {/* Chart */}
      {!loading && !error && data.length > 0 && (
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) =>
                  new Date(t).toLocaleTimeString()
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(t) =>
                  new Date(Number(t)).toLocaleString()
                }
              />
              <Legend />

              {fields.map((field) => (
                <Line
                  key={field}
                  type="monotone"
                  dataKey={field}
                  stroke={getColor(field)}
                  dot={false}
                />
              ))}

              {annotations.map((a) => (
                <ReferenceLine
                  key={a.id}
                  x={a.timestamp}
                  stroke="red"
                  label={{
                    value: a.text,
                    position: "top",
                    fill: "red",
                  }}
                  onClick={() => handleDeleteAnnotation(a.id)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
}

/* -------------------- helpers -------------------- */
function getColor(field: MetricField): string {
  switch (field) {
    case "REQUESTS":
      return "#3b82f6";
    case "ERRORS":
      return "#ef4444";
    case "P50_LATENCY":
      return "#10b981";
    case "P95_LATENCY":
      return "#f59e0b";
    case "P99_LATENCY":
      return "#8b5cf6";
    default:
      return "#000000";
  }
}
