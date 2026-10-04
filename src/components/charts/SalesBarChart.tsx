'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
  Legend,
} from 'recharts';
import { formatCompactCurrency, formatCurrency } from '../../lib/utils';
import { ChartTooltip } from './ChartTooltip';

export interface SalesBarChartProps {
  data: any[];
  threshold?: number;
  isAllYears?: boolean;
}

export function SalesBarChart({ data, threshold = 0, isAllYears = false }: SalesBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center text-xs text-slate-400">
        No sales data available to render.
      </div>
    );
  }

  // Multi-year comparison view
  if (isAllYears) {
    return (
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickFormatter={(val) => formatCompactCurrency(val)}
            />
            <Tooltip
              content={<ChartTooltip threshold={threshold} />}
              cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
            />
            {threshold > 0 && (
              <ReferenceLine
                y={threshold}
                stroke="#DC2626"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: `Threshold: ${formatCompactCurrency(threshold)}`,
                  fill: '#DC2626',
                  fontSize: 11,
                  position: 'top',
                }}
              />
            )}
            <Bar dataKey="sales2022" name="2022" fill="#94A3B8" radius={[4, 4, 0, 0]} maxBarSize={20} />
            <Bar dataKey="sales2023" name="2023" fill="#60A5FA" radius={[4, 4, 0, 0]} maxBarSize={20} />
            <Bar dataKey="sales2024" name="2024" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Single year view
  return (
    <div className="h-72 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
            tick={{ fill: '#64748B', fontSize: 12 }}
            tickFormatter={(val) => formatCompactCurrency(val)}
          />
          <Tooltip
            content={<ChartTooltip threshold={threshold} />}
            cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
          />
          {threshold > 0 && (
            <ReferenceLine
              y={threshold}
              stroke="#DC2626"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `Threshold: ${formatCompactCurrency(threshold)}`,
                fill: '#DC2626',
                fontSize: 11,
                position: 'top',
              }}
            />
          )}
          <Bar dataKey="sales" name="Monthly Sales" radius={[4, 4, 0, 0]} maxBarSize={32}>
            {data.map((entry, index) => {
              const meetsThreshold = threshold > 0 ? entry.sales >= threshold : true;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    threshold > 0
                      ? meetsThreshold
                        ? '#2563EB' // Active blue
                        : '#CBD5E1' // Muted gray
                      : '#2563EB'
                  }
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
