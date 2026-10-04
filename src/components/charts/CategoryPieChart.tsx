'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { CategorySalesRecord } from '../../data/sales';
import { formatCompactCurrency, formatCurrency } from '../../lib/utils';

export interface CategoryPieChartProps {
  data: CategorySalesRecord[];
  threshold?: number;
}

export function CategoryPieChart({ data, threshold = 0 }: CategoryPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center text-xs text-slate-400">
        No category data available.
      </div>
    );
  }

  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);

  const enrichedData = data.map((item) => ({
    ...item,
    percentage: totalSales > 0 ? (item.sales / totalSales) * 100 : 0,
    meetsThreshold: threshold > 0 ? item.sales >= threshold : true,
  }));

  const activeItem = activeIndex !== null ? enrichedData[activeIndex] : null;

  const renderTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const entry = payload[0].payload;

    return (
      <div className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs text-xs min-w-[170px]">
        <div className="flex items-center gap-2 font-semibold text-slate-800 border-b border-slate-100 pb-1.5 mb-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>{entry.category}</span>
        </div>
        <div className="flex justify-between gap-4 py-0.5">
          <span className="text-slate-500">Sales:</span>
          <span className="font-mono font-medium text-slate-900 tabular-nums">
            {formatCurrency(entry.sales)}
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
              {entry.meetsThreshold ? 'Achieved' : 'Below Target'}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Donut Chart with Center Metric */}
      <div className="relative h-60 w-60 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={enrichedData}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={95}
              paddingAngle={3}
              dataKey="sales"
              nameKey="category"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {enrichedData.map((entry, index) => {
                const isFaded = threshold > 0 && !entry.meetsThreshold;
                return (
                  <Cell
                    key={`cat-cell-${index}`}
                    fill={isFaded ? '#CBD5E1' : entry.color}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    className="cursor-pointer transition-opacity"
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                  />
                );
              })}
            </Pie>
            <Tooltip content={renderTooltip} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Info in Donut */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {activeItem ? activeItem.category : 'Total'}
          </span>
          <span className="text-base font-bold text-slate-900 font-mono tabular-nums leading-tight">
            {formatCompactCurrency(activeItem ? activeItem.sales : totalSales)}
          </span>
          <span className="text-[11px] text-slate-500 font-mono tabular-nums">
            {activeItem ? `${activeItem.percentage.toFixed(1)}%` : '100%'}
          </span>
        </div>
      </div>

      {/* Structured Category Legend & Metrics */}
      <div className="w-full flex-1 space-y-2.5">
        {enrichedData.map((item, index) => {
          const isFaded = threshold > 0 && !item.meetsThreshold;
          return (
            <div
              key={item.category}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer text-xs ${
                activeIndex === index
                  ? 'bg-slate-100/90'
                  : 'hover:bg-slate-50'
              } ${isFaded ? 'opacity-60' : 'opacity-100'}`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 rounded-xs shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-800">{item.category}</span>
                {threshold > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      item.meetsThreshold
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.meetsThreshold ? 'Met' : 'Below'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-500 tabular-nums text-[11px]">
                  {item.percentage.toFixed(1)}%
                </span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums min-w-[70px] text-right">
                  {formatCurrency(item.sales)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
