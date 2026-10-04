'use client';

import React from 'react';
import { BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

export type ChartType = 'bar' | 'line' | 'pie';

export interface ChartSelectorProps {
  currentChart: ChartType;
  onSelectChart: (chart: ChartType) => void;
}

const CHART_TYPES: { type: ChartType; label: string; icon: React.ReactNode }[] = [
  { type: 'bar', label: 'Bar Chart', icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { type: 'line', label: 'Line Chart', icon: <LineChartIcon className="h-3.5 w-3.5" /> },
  { type: 'pie', label: 'Pie Chart', icon: <PieChartIcon className="h-3.5 w-3.5" /> },
];

export function ChartSelector({ currentChart, onSelectChart }: ChartSelectorProps) {
  return (
    <div
      className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200/80 shadow-xs"
      role="group"
      aria-label="Chart visualization type selector"
    >
      {CHART_TYPES.map(({ type, label, icon }) => {
        const isActive = currentChart === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelectChart(type)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
              isActive
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            aria-pressed={isActive}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
