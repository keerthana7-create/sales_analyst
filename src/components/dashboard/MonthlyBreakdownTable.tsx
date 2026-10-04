'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { formatCurrency, formatPercentage } from '../../lib/utils';
import { ArrowUpDown, Check, Minus } from 'lucide-react';

export interface MonthlyRecord {
  month: string;
  monthIndex: number;
  sales: number;
  orders?: number;
  sales2022?: number;
  sales2023?: number;
  sales2024?: number;
  growthYoY?: number;
}

export interface MonthlyBreakdownTableProps {
  data: MonthlyRecord[];
  threshold?: number;
  isAllYears?: boolean;
}

export function MonthlyBreakdownTable({ data, threshold = 0, isAllYears = false }: MonthlyBreakdownTableProps) {
  const [sortField, setSortField] = useState<'monthIndex' | 'sales'>('monthIndex');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField] || 0;
    let bVal = b[sortField] || 0;
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (field: 'monthIndex' | 'sales') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'sales' ? 'desc' : 'asc');
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="p-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <CardTitle>Monthly Performance Breakdown</CardTitle>
          <CardDescription>
            Detailed sales data with threshold achievement tracking
          </CardDescription>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Total: <span className="font-semibold text-slate-900">{formatCurrency(totalSales)}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th
                scope="col"
                className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
                onClick={() => handleSort('monthIndex')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Month</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>

              {isAllYears && (
                <>
                  <th scope="col" className="py-3 px-4 text-right">2022</th>
                  <th scope="col" className="py-3 px-4 text-right">2023</th>
                  <th scope="col" className="py-3 px-4 text-right">2024</th>
                </>
              )}

              <th
                scope="col"
                className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 select-none"
                onClick={() => handleSort('sales')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>{isAllYears ? 'Combined Sales' : 'Sales'}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>

              <th scope="col" className="py-3 px-4 text-right">Share</th>

              {!isAllYears && (
                <th scope="col" className="py-3 px-4 text-right">Growth YoY</th>
              )}

              {threshold > 0 && (
                <th scope="col" className="py-3 px-4 text-center">Threshold Status</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
            {sortedData.map((row) => {
              const meetsThreshold = threshold > 0 ? row.sales >= threshold : true;
              const share = totalSales > 0 ? (row.sales / totalSales) * 100 : 0;

              return (
                <tr
                  key={row.month}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    threshold > 0 && meetsThreshold
                      ? 'bg-emerald-50/20'
                      : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-sans font-medium text-slate-900">
                    {row.month}
                  </td>

                  {isAllYears && (
                    <>
                      <td className="py-2.5 px-4 text-right text-slate-600">
                        {formatCurrency(row.sales2022 || 0)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-600">
                        {formatCurrency(row.sales2023 || 0)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-600">
                        {formatCurrency(row.sales2024 || 0)}
                      </td>
                    </>
                  )}

                  <td className="py-2.5 px-4 text-right font-semibold text-slate-900">
                    {formatCurrency(row.sales)}
                  </td>

                  <td className="py-2.5 px-4 text-right text-slate-500">
                    {share.toFixed(1)}%
                  </td>

                  {!isAllYears && (
                    <td className="py-2.5 px-4 text-right">
                      {row.growthYoY !== undefined ? (
                        <span
                          className={
                            row.growthYoY >= 0 ? 'text-emerald-700' : 'text-rose-600'
                          }
                        >
                          {formatPercentage(row.growthYoY)}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  )}

                  {threshold > 0 && (
                    <td className="py-2.5 px-4 text-center">
                      {meetsThreshold ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <Check className="h-3 w-3" /> Met
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-sans text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          <Minus className="h-3 w-3" /> Below
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
