'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../lib/utils';

export interface SalesPieChartProps {
  data: any[];
  threshold?: number;
}

// Harmonious 12-month palette
const MONTH_PALETTE = [
  '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD',
  '#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4',
  '#D97706', '#F59E0B', '#FBBF24', '#FCD34D',
];

export function SalesPieChart({ data, threshold = 0 }: SalesPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center text-xs text-slate-400">
        No sales data available to render.
      </div>
    );
  }

  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);

  const formattedData = data.map((item, idx) => ({
    name: item.month,
    value: item.sales,
    percentage: totalSales > 0 ? (item.sales / totalSales) * 100 : 0,
    color: MONTH_PALETTE[idx % MONTH_PALETTE.length],
    meetsThreshold: threshold > 0 ? item.sales >= threshold : true,
  }));

  const renderTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const entry = payload[0].payload;

    return (
      <div className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs text-xs min-w-[150px]">
        <div className="flex items-center gap-2 font-semibold text-slate-800 border-b border-slate-100 pb-1.5 mb-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>Month: {entry.name}</span>
        </div>
        <div className="flex justify-between gap-4 py-0.5">
          <span className="text-slate-500">Sales:</span>
          <span className="font-mono font-medium text-slate-900 tabular-nums">
            {formatCurrency(entry.value)}
          </span>
        </div>
        <div className="flex justify-between gap-4 py-0.5">
          <span className="text-slate-500">Share:</span>
          <span className="font-mono text-slate-700 tabular-nums">
            {entry.percentage.toFixed(1)}%
          </span>
        </div>
        {threshold > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex justify-between text-[11px]">
            <span className="text-slate-500">Threshold:</span>
            <span className={entry.meetsThreshold ? 'text-emerald-700 font-medium' : 'text-slate-500'}>
              {entry.meetsThreshold ? 'Met' : 'Below'}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-72 sm:h-80 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  threshold > 0 && !entry.meetsThreshold
                    ? '#CBD5E1'
                    : entry.color
                }
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
