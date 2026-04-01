import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, className = '', noPadding = false }: CardProps) {
  return (
    <div className={`bg-surface-variant/20 backdrop-blur-md rounded-xl border border-outline-variant/10 shadow-ambient dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${className}`}>
      {!noPadding ? (
        <div className="p-6">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
