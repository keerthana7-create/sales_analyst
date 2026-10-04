import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  highlight?: boolean;
}

export function StatCard({ title, value, description, icon, trend, highlight }: StatCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all',
        highlight ? 'border-blue-300 ring-1 ring-blue-500/20' : ''
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 tracking-tight">
          {title}
        </span>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {value}
        </span>
      </div>

      {(description || trend) && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          {trend && (
            <span
              className={cn(
                'font-medium font-mono tabular-nums',
                trend.isPositive ? 'text-emerald-700' : 'text-slate-600'
              )}
            >
              {trend.value}
            </span>
          )}
          {trend?.label && <span>{trend.label}</span>}
          {description && !trend && <span>{description}</span>}
        </div>
      )}
    </Card>
  );
}
