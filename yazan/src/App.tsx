import { useState } from "react";
import { DatasetBrowser } from "./components/DatasetBrowser";
import { MetricsChart } from "./components/Metrics/MetricsChart";

function App() {
  const [selectedDatasetId, setSelectedDatasetId] =
    useState<string | null>(null);

  return (
    <div style={{ padding: 20 }}>
      <DatasetBrowser onSelect={setSelectedDatasetId} />

      <MetricsChart
        datasetId={selectedDatasetId!}
        fields={["REQUESTS", "ERRORS"]}
      />
    </div>
  );
}

export default App;
