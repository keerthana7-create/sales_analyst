import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, prefixElement, suffixElement, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixElement && (
            <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
              {prefixElement}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:opacity-50 font-mono tabular-nums',
              prefixElement ? 'pl-8' : '',
              suffixElement ? 'pr-8' : '',
              error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : '',
              className
            )}
            {...props}
          />
          {suffixElement && (
            <div className="absolute right-3 flex items-center text-slate-400">
              {suffixElement}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
