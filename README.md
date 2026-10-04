# Sales Analytics Dashboard

## Overview

The **Sales Analytics Dashboard** is a modern, responsive frontend application built to analyze and visualize sales performance across fiscal years 2022, 2023, and 2024. Designed with clean atomic/component-based architecture, SaaS visual hierarchy, and accessibility best practices, it provides dynamic KPI metrics, interactive multi-chart visualizations, category revenue breakdowns, and an advanced sales threshold filtering engine.

## Features

- **Year Filtering**: Instant switching between 2022, 2023, 2024, and "All Years" comparative view, automatically recalculating all metrics and charts without page reload.
- **Dynamic KPI Cards**: Real-time summary metrics for Total Sales, Average Monthly Sales, Highest Sales Month, and Total Records Count with tabular figures and trend comparisons.
- **Sales Analytics & Visualization**:
  - **Bar Chart**: High-clarity monthly distribution with comparative grouped bars across years in "All Years" mode.
  - **Line Chart**: Smooth trajectory visualization supporting single-year trends and multi-year trajectory overlays.
  - **Pie Chart**: Monthly and quarterly sales share breakdown with custom formatted tooltips.
- **Category Analysis**: Interactive Donut chart displaying product category distribution (Electronics, Clothing, Home & Furniture, Beauty, Sports) with hover metrics and center revenue totals.
- **Sales Threshold Filtering**: Dynamic numeric threshold input with quick presets ($40k, $50k, $60k). Exceeded months are highlighted visually with dashed reference lines on charts and positive indicator badges in breakdown tables.
- **High-Density Monthly Table**: Interactive tabular breakdown with sorting, percentage shares, YoY growth rates, and threshold achievement status tags.
- **CSV Data Export**: Direct client-side export generating downloadable `.csv` reports of the active dataset.
- **Responsive & Accessible Design**: Optimized across mobile, tablet, and desktop viewports with WCAG AA compliant contrast, keyboard navigation, and semantic structure.

## Technology Stack

- **Framework**: Next.js 15 / React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```text
├── app/                        # Next.js 15 App Router directory
│   ├── layout.tsx              # Root HTML and metadata layout
│   ├── page.tsx                # Main Server Component page entry point
│   └── globals.css             # Tailwind CSS global styles
├── components/                 # Root-level component exports (Next.js compatible)
│   ├── dashboard/              # Core dashboard feature components
│   │   ├── Dashboard.tsx       # Main dashboard container & state controller
│   │   ├── DashboardHeader.tsx # Header navigation & action controls
│   │   ├── YearSelector.tsx    # Fiscal year segmented control
│   │   ├── StatCard.tsx        # Reusable metric card with tabular numbers
│   │   ├── ChartSelector.tsx   # Bar / Line / Pie switcher
│   │   ├── ThresholdFilter.tsx # Sales threshold input with validation & feedback
│   │   └── MonthlyBreakdownTable.tsx # Tabular view with sorting & threshold status
│   ├── charts/                 # Chart visualization components
│   │   ├── SalesBarChart.tsx   # Recharts Bar Chart with threshold reference line
│   │   ├── SalesLineChart.tsx  # Recharts Line Chart with trajectory comparison
│   │   ├── SalesPieChart.tsx   # Recharts Monthly share distribution
│   │   ├── CategoryPieChart.tsx# Recharts Donut chart for category sales
│   │   └── ChartTooltip.tsx    # Styled accessible tooltip overlay
│   └── ui/                     # Primitives (Atomic UI design tokens)
│       ├── Card.tsx            # Flat surface container with subtle borders
│       ├── Button.tsx          # Accessible buttons with variant states
│       └── Input.tsx           # Form inputs with prefix affordances
├── data/
│   └── sales.ts                # Structured mock sales dataset (2022–2024)
├── lib/
│   └── utils.ts                # Currency, percentage, and number formatters
├── src/                        # SPA build components & Vite entry points
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
Node.js 18+ and npm installed.

### Installation
Clone the repository and install dependencies:

```bash
npm install
```

### Run Locally (Development)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To build the project for production:

```bash
npm run build
```

## Run Production

To preview the built production bundle locally:

```bash
npm start
```

## Deployment

### Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Framework Preset will be automatically detected as Next.js or Vite.
5. Click **Deploy**.

## Data

The current version uses structured mock sales data defined in `/data/sales.ts`. The dataset adheres to strict TypeScript schemas (`YearDataset`, `MonthlySalesRecord`, `CategorySalesRecord`). The data layer is decoupled from UI presentation components, allowing it to be effortlessly replaced with a REST API, GraphQL endpoint, or database query in future iterations.
