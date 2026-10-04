'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts';
import { formatCompactCurrency } from '../../lib/utils';
import { ChartTooltip } from './ChartTooltip';

export interface SalesLineChartProps {
  data: any[];
  threshold?: number;
  isAllYears?: boolean;
}

export function SalesLineChart({ data, threshold = 0, isAllYears = false }: SalesLineChartProps) {
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
          <LineChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
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
            <Tooltip content={<ChartTooltip threshold={threshold} />} />
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
            <Line
              type="monotone"
              dataKey="sales2022"
              name="2022"
              stroke="#94A3B8"
              strokeWidth={2}
              dot={{ r: 3, fill: '#94A3B8' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="sales2023"
              name="2023"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ r: 3, fill: '#60A5FA' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="sales2024"
              name="2024"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#2563EB' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Single year view
  return (
    <div className="h-72 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
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
          <Tooltip content={<ChartTooltip threshold={threshold} />} />
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
          <Line
            type="monotone"
            dataKey="sales"
            name="Monthly Sales"
            stroke="#2563EB"
            strokeWidth={2.5}
            dot={(props: any) => {
              const { cx, cy, payload } = props;
              const meetsThreshold = threshold > 0 ? payload.sales >= threshold : true;
              return (
                <circle
                  key={`dot-${props.key}`}
                  cx={cx}
                  cy={cy}
                  r={threshold > 0 && meetsThreshold ? 4.5 : 3.5}
                  fill={threshold > 0 ? (meetsThreshold ? '#2563EB' : '#94A3B8') : '#2563EB'}
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                />
              );
            }}
            activeDot={{ r: 6, fill: '#1D4ED8', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
