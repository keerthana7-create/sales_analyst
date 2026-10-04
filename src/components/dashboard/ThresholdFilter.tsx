'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../lib/utils';

export interface ThresholdFilterProps {
  threshold: number;
  onThresholdChange: (threshold: number) => void;
  monthsExceeded: number;
  totalMonths: number;
  totalThresholdSales: number;
  maxMonthSales: number;
}

export function ThresholdFilter({
  threshold,
  onThresholdChange,
  monthsExceeded,
  totalMonths,
  totalThresholdSales,
  maxMonthSales,
}: ThresholdFilterProps) {
  const [inputValue, setInputValue] = useState<string>(threshold > 0 ? String(threshold) : '');
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(threshold > 0 ? String(threshold) : '');
  }, [threshold]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(rawVal);

    if (rawVal === '') {
      setInputError(null);
      onThresholdChange(0);
      return;
    }

    const num = parseInt(rawVal, 10);
    if (isNaN(num)) {
      setInputError('Please enter a valid numeric value');
      return;
    }

    if (num < 0) {
      setInputError('Threshold cannot be negative');
      return;
    }

    setInputError(null);
    onThresholdChange(num);
  };

  const handleClear = () => {
    setInputValue('');
    setInputError(null);
    onThresholdChange(0);
  };

  const handlePresetClick = (amount: number) => {
    setInputValue(String(amount));
    setInputError(null);
    onThresholdChange(amount);
  };

  const presets = [40000, 50000, 60000];

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Input & Label */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div>
            <label
              htmlFor="sales-threshold-input"
              className="text-xs font-semibold text-slate-900 block"
            >
              Sales Threshold Filter
            </label>
            <p className="text-[11px] text-slate-500">
              Highlight months and categories that meet or exceed this target
            </p>
          </div>

          <div className="relative flex items-center w-full sm:w-52">
            <span className="pointer-events-none absolute left-3 text-slate-400">
              <DollarSign className="h-3.5 w-3.5" />
            </span>
            <input
              id="sales-threshold-input"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 50000"
              value={inputValue}
              onChange={handleInputChange}
              className={`h-9 w-full rounded-lg border bg-white pl-8 pr-8 text-xs font-mono tabular-nums text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                inputError
                  ? 'border-rose-400 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-slate-400 focus:ring-slate-950/10'
              }`}
              aria-describedby={inputError ? 'threshold-error' : undefined}
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                aria-label="Clear threshold filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">Presets:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className={`px-2 py-1 text-[11px] font-mono rounded-md border transition-colors cursor-pointer ${
                  threshold === preset
                    ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                ${preset / 1000}k
              </button>
            ))}
            {threshold > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] text-slate-500 hover:text-slate-800 underline px-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Threshold Status Feedback */}
        {threshold > 0 && (
          <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 text-xs">
            {monthsExceeded > 0 ? (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200/60">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>{monthsExceeded}</strong> of {totalMonths} months met target (
                  <strong>{formatCurrency(totalThresholdSales)}</strong> total)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200/60">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>
                  No months met threshold of {formatCurrency(threshold)}. Peak was{' '}
                  {formatCurrency(maxMonthSales)}.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {inputError && (
        <p id="threshold-error" className="mt-1.5 text-[11px] text-rose-600 font-medium">
          {inputError}
        </p>
      )}
    </div>
  );
}
