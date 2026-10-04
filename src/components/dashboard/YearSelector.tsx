'use client';

import React from 'react';
import { SelectedYear } from '../../data/sales';

export interface YearSelectorProps {
  selectedYear: SelectedYear;
  onSelectYear: (year: SelectedYear) => void;
}

const YEAR_OPTIONS: { label: string; value: SelectedYear }[] = [
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: 'All Years', value: 'all' },
];

export function YearSelector({ selectedYear, onSelectYear }: YearSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
        Select Fiscal Period:
      </span>
      <div
        className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200/80 shadow-xs"
        role="group"
        aria-label="Year selection filter"
      >
        {YEAR_OPTIONS.map((option) => {
          const isActive = selectedYear === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectYear(option.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
