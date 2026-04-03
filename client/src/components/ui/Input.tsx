import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({ label, error, leftIcon, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-on-surface">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          className={`w-full bg-surface-container-highest border rounded-md py-2 px-3 text-on-surface text-sm
            focus:outline-none focus:ring-1 transition-colors
            ${error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-outline-variant/20 focus:border-primary focus:ring-primary'}
            ${leftIcon ? 'pl-10' : ''}
            ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
    </div>
  );
}
