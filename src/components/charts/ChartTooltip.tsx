import React from 'react';
import { formatCurrency } from '../../lib/utils';

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  threshold?: number;
}

export function ChartTooltip({ active, payload, label, threshold }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs min-w-[160px] text-xs">
      <div className="mb-2 border-b border-slate-100 pb-1.5 font-semibold text-slate-800">
        {label}
      </div>
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const value = Number(entry.value);
          const meetsThreshold = threshold && threshold > 0 ? value >= threshold : null;

          return (
            <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-xs"
                  style={{ backgroundColor: entry.color || entry.fill }}
                />
                <span className="text-slate-600">{entry.name || 'Sales'}</span>
              </div>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {formatCurrency(value)}
              </span>
            </div>
          );
        })}

        {threshold && threshold > 0 && (
          <div className="mt-2 border-t border-slate-100 pt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Threshold ({formatCurrency(threshold)})</span>
            <span
              className={
                Number(payload[0]?.value) >= threshold
                  ? 'text-emerald-700 font-medium'
                  : 'text-slate-500 font-medium'
              }
            >
              {Number(payload[0]?.value) >= threshold ? 'Exceeded' : 'Below'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
