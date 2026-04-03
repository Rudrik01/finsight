import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-on-surface">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full bg-surface-container-highest border rounded-md py-2 px-3 text-on-surface text-sm
          focus:outline-none focus:ring-1 transition-colors cursor-pointer
          ${error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-outline-variant/20 focus:border-primary focus:ring-primary'}
          ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
    </div>
  );
}
