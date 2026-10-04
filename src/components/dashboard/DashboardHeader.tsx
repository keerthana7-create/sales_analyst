import React from 'react';
import { BarChart3, Download, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export interface DashboardHeaderProps {
  onResetFilters: () => void;
  onExportData: () => void;
  hasActiveFilters: boolean;
}

export function DashboardHeader({ onResetFilters, onExportData, hasActiveFilters }: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white sticky top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand & Wordmark */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                Sales Analytics Dashboard
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Comprehensive sales performance analysis from 2022–2024
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="text-slate-600 hover:text-slate-900"
                aria-label="Reset filters to default"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              aria-label="Export sales data report"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
