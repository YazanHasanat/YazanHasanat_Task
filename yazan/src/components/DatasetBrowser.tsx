import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import { getDatasets } from "../api/datasets.api";
import type { Dataset, DatasetStatus } from "../types/dataset";
interface Props {
  onSelect: (datasetId: string) => void;
}

export function DatasetBrowser({ onSelect }: Props) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<DatasetStatus | "all">("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await getDatasets({ search, status });
        if (!cancelled) {
          setDatasets(res.datasets);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [search, status]);

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Datasets
      </Typography>

      <Stack spacing={2} mb={2}>
        <TextField
          size="small"
          placeholder="Search datasets…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          size="small"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as DatasetStatus | "all")
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List disablePadding>
        {datasets.map((d) => (
          <ListItemButton
            key={d.id}
            onClick={() => onSelect(d.id)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
            }}
          >
            <ListItemText
              primary={d.name}
              secondary={d.status}
            />
          </ListItemButton>
        ))}

        {!loading && datasets.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            py={2}
          >
            No datasets found
          </Typography>
        )}
      </List>
    </Paper>
  );
}
