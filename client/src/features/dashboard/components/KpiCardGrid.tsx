import type { ReactNode } from 'react';

interface KpiCardGridProps {
  children: ReactNode;
}

export function KpiCardGrid({ children }: KpiCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {children}
    </div>
  );
}
