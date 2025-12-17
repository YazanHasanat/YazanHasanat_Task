# YazanHasanat_Task
# Metrics Monitoring Dashboard

## Overview

This project implements a simplified **metrics monitoring dashboard** built with **React 18 + TypeScript**.  
It focuses on clean architecture, strong type safety, and realistic frontend patterns commonly used in production dashboards.

The application simulates a real monitoring system by integrating a centralized API layer, dataset browsing, time-series metrics visualization, and annotations.

---

## Tech Stack

- **React 18**
- **TypeScript (strict mode)**
- **Axios** – centralized API service layer
- **Material UI (MUI)** – UI components and layout
- **Recharts** – time-series chart visualization
- **Vite** – development tooling
---

## 1. API Service Layer

### Goal

Provide a centralized, scalable, and type-safe way to communicate with APIs while keeping UI components decoupled from networking logic.

### Why Axios?

Axios was chosen over the native `fetch` API because it provides:

- Built-in request and response interceptors
- Cleaner and more predictable error handling
- Automatic JSON transformation
- Easier extensibility for authentication, logging, and retries
- Widespread usage in production React applications

### Implementation

- A single Axios client is shared across the application
- Global configuration includes:
  - Base URL
  - Default headers
  - Request timeout
- Interceptors are used to:
  - Normalize API errors into user-friendly messages
  - Prepare the app for future authentication support

---

## 2. Dataset Browser

### Goal

Allow users to browse, search, filter, and select datasets that act as sources for metrics.

### Features

- Fetch and display datasets from an API
- Debounced search by dataset name
- Status filtering:
  - Active
  - Inactive
  - Archived
- Loading and error states
- Dataset selection that drives metrics visualization

### Design Notes

- Filtering logic lives in the API layer, not in the UI
- UI components consume a clean `getDatasets()` API
- Debouncing prevents unnecessary API requests

---

## 3. Metrics Visualization

### Goal

Visualize time-series metrics for a selected dataset in a clear and interactive way.

### Features

- Time range selection:
  - Last 30 minutes
  - Last 2 hours
  - Last 24 hours
- Multi-metric visualization (Requests, Errors, Latency)
- Responsive charts using **Recharts**
- Explicit loading, empty, and error states
- Fully typed metrics data model (no `any` usage)

### Data Flow

1. User selects a dataset
2. User selects a time range and metrics
3. Metrics API is called with:
   - `datasetId`
   - `from` / `to` timestamps
   - Selected metric fields
4. Mock backend returns time-series data
5. Chart updates automatically when inputs change

---

## 4. Annotations

### Goal

Allow users to annotate important events directly on the metrics timeline to provide context.

### Features

- Create annotations with a timestamp and label
- Display annotations as markers on the chart
- Hoverable labels for context
- Delete annotations via interaction
- Annotations are scoped per dataset

---

## UI & Styling

- **Material UI (MUI)** is used for layout, components, and spacing
- Consistent design across dataset list, controls, and charts
- Responsive layout for different screen sizes
- Focus on usability rather than heavy visual styling

---

## Architectural Principles

- Clear separation between UI, API, and data layers
- Centralized API service layer
- Strict TypeScript typing across the entire app
- No usage of `any`
- Explicit handling of:
  - Loading states
  - Empty states
  - Error states

---

## How to Run the Project

1. Install dependencies:
npm install
2. Start the development server

Start the development server:
npm run dev
Open the browser:
http://localhost:5173
