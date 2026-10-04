import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'active';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap cursor-pointer';

    const variants = {
      primary: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-xs',
      secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-200/80',
      outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs',
      ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
      active: 'bg-slate-900 text-white shadow-xs font-semibold',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
      md: 'h-9 px-4 text-xs rounded-lg gap-2',
      lg: 'h-10 px-5 text-sm rounded-lg gap-2',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
