import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color = 'var(--color-primary-500)', className = '' }: BadgeProps) {
  return (
    <span 
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${className}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color: color,
        border: `0.5px solid color-mix(in srgb, ${color} 30%, transparent)`
      }}
    >
      {children}
    </span>
  );
}
