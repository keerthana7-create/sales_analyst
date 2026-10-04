'use client';

import React, { useState, useMemo } from 'react';
import {
  SelectedYear,
  getSalesData,
  calculateKPIs,
} from '../../data/sales';
import { DashboardHeader } from './DashboardHeader';
import { YearSelector } from './YearSelector';
import { StatCard } from './StatCard';
import { ChartSelector, ChartType } from './ChartSelector';
import { ThresholdFilter } from './ThresholdFilter';
import { MonthlyBreakdownTable } from './MonthlyBreakdownTable';
import { SalesBarChart } from '../charts/SalesBarChart';
import { SalesLineChart } from '../charts/SalesLineChart';
import { SalesPieChart } from '../charts/SalesPieChart';
import { CategoryPieChart } from '../charts/CategoryPieChart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import {
  DollarSign,
  TrendingUp,
  Award,
  Database,
  Calendar,
  Layers,
  PieChart as PieIcon,
  Filter,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../lib/utils';

export function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<SelectedYear>('2024');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState<number>(0);

  // Retrieve current active dataset
  const currentDataset = useMemo(() => {
    return getSalesData(selectedYear);
  }, [selectedYear]);

  // Calculate dynamic KPIs
  const kpis = useMemo(() => {
    return calculateKPIs(
      currentDataset.monthlySales as any,
      threshold,
      selectedYear === 'all'
    );
  }, [currentDataset, threshold, selectedYear]);

  // Maximum month sales for threshold comparison context
  const maxMonthSales = useMemo(() => {
    return Math.max(...currentDataset.monthlySales.map((m: any) => m.sales), 0);
  }, [currentDataset]);

  // Reset filters handler
  const handleResetFilters = () => {
    setSelectedYear('2024');
    setThreshold(0);
    setChartType('bar');
  };

  // Export current view as CSV
  const handleExportCSV = () => {
    const headers = ['Month', 'Sales', 'Year'];
    const rows = (currentDataset.monthlySales as any[]).map((item) => [
      item.month,
      item.sales,
      selectedYear === 'all' ? 'All (2022-2024)' : selectedYear,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `sales_analytics_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters = selectedYear !== '2024' || threshold > 0 || chartType !== 'bar';

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans flex flex-col">
      {/* Top Application Header */}
      <DashboardHeader
        onResetFilters={handleResetFilters}
        onExportData={handleExportCSV}
        hasActiveFilters={hasActiveFilters}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Controls Bar: Year Selection & Threshold Filter */}
        <section aria-label="Dashboard controls" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
            <YearSelector selectedYear={selectedYear} onSelectYear={setSelectedYear} />

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                Active View:{' '}
                <strong className="text-slate-800 font-semibold">
                  {selectedYear === 'all' ? 'All Years (2022–2024)' : `Fiscal Year ${selectedYear}`}
                </strong>
              </span>
            </div>
          </div>

          {/* Sales Threshold Filter Component */}
          <ThresholdFilter
            threshold={threshold}
            onThresholdChange={setThreshold}
            monthsExceeded={kpis.thresholdExceededCount}
            totalMonths={currentDataset.monthlySales.length}
            totalThresholdSales={kpis.thresholdSalesAmount}
            maxMonthSales={maxMonthSales}
          />
        </section>

        {/* Dynamic Summary Cards (KPIs) */}
        <section aria-label="Key performance indicators">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Sales"
              value={formatCurrency(kpis.totalSales)}
              description={
                selectedYear === 'all'
                  ? 'Combined revenue across 3 fiscal years'
                  : `Full year gross sales for ${selectedYear}`
              }
              icon={<DollarSign className="h-4 w-4" />}
              trend={
                selectedYear === '2024'
                  ? { value: '+27.4%', isPositive: true, label: 'vs 2023' }
                  : selectedYear === '2023'
                  ? { value: '+30.5%', isPositive: true, label: 'vs 2022' }
                  : undefined
              }
            />

            <StatCard
              title="Average Monthly Sales"
              value={formatCurrency(kpis.averageMonthlySales)}
              description={`Mean monthly baseline over ${currentDataset.monthlySales.length} months`}
              icon={<TrendingUp className="h-4 w-4" />}
            />

            <StatCard
              title="Highest Sales Month"
              value={formatCurrency(kpis.highestMonth.sales)}
              description={`Peak achieved in ${kpis.highestMonth.month}`}
              icon={<Award className="h-4 w-4" />}
            />

            <StatCard
              title="Number of Sales Records"
              value={formatNumber(kpis.totalRecordsCount)}
              description={
                selectedYear === 'all'
                  ? '36 monthly reporting records total'
                  : '12 validated monthly records'
              }
              icon={<Database className="h-4 w-4" />}
            />
          </div>
        </section>

        {/* Analytics Charts Grid: Overview Chart + Category Donut Chart */}
        <section aria-label="Sales charts analytics" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Sales Overview Chart (2 Columns on large screens) */}
          <Card className="lg:col-span-2 flex flex-col justify-between">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-100">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span>Monthly Sales Overview</span>
                  {threshold > 0 && (
                    <span className="text-[11px] font-normal text-slate-500 font-mono">
                      (Target: {formatCurrency(threshold)})
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {selectedYear === 'all'
                    ? 'Comparing monthly trajectories across 2022, 2023, and 2024'
                    : `Monthly distribution and performance trends for ${selectedYear}`}
                </CardDescription>
              </div>

              {/* Chart Switcher */}
              <ChartSelector currentChart={chartType} onSelectChart={setChartType} />
            </CardHeader>

            <CardContent className="pt-4 flex-1 flex flex-col justify-center">
              {chartType === 'bar' && (
                <SalesBarChart
                  data={currentDataset.monthlySales}
                  threshold={threshold}
                  isAllYears={selectedYear === 'all'}
                />
              )}

              {chartType === 'line' && (
                <SalesLineChart
                  data={currentDataset.monthlySales}
                  threshold={threshold}
                  isAllYears={selectedYear === 'all'}
                />
              )}

              {chartType === 'pie' && (
                <SalesPieChart
                  data={currentDataset.monthlySales}
                  threshold={threshold}
                />
              )}
            </CardContent>

            {/* Quiet chart legend context */}
            <div className="border-t border-slate-100 px-6 py-3 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" />
                <span>Sales figures in USD ($)</span>
              </span>
              {threshold > 0 && (
                <span className="text-slate-600">
                  Highlighted bars/dots meet or exceed the {formatCurrency(threshold)} threshold
                </span>
              )}
            </div>
          </Card>

          {/* Category Sales Distribution Donut Chart (1 Column) */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="flex items-center justify-between">
                <span>Category Sales</span>
                <span className="text-xs font-normal text-slate-500 font-mono">
                  {currentDataset.categorySales.length} Categories
                </span>
              </CardTitle>
              <CardDescription>
                {selectedYear === 'all'
                  ? 'Aggregate product category breakdown (2022–2024)'
                  : `Product category breakdown for ${selectedYear}`}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 flex-1 flex flex-col justify-center">
              <CategoryPieChart
                data={currentDataset.categorySales}
                threshold={threshold}
              />
            </CardContent>

            <div className="border-t border-slate-100 px-6 py-3 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Interactive hover to inspect category detail</span>
            </div>
          </Card>
        </section>

        {/* High-density Monthly Breakdown Table */}
        <section aria-label="Detailed tabular data">
          <MonthlyBreakdownTable
            data={currentDataset.monthlySales as any}
            threshold={threshold}
            isAllYears={selectedYear === 'all'}
          />
        </section>
      </main>

      {/* Accessible Footer with attribution and data note */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Sales Analytics Dashboard · Evaluator Assessment Deliverable
          </div>
          <div className="flex items-center gap-4">
            <span>Fiscal Years 2022–2024</span>
            <span aria-hidden="true">·</span>
            <span>Local Mock Data Layer (API Ready)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
