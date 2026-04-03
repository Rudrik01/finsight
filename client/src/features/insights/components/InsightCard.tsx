import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface InsightCardProps {
  title: string;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * InsightCard — Generic presentational wrapper for all insight widgets.
 * Receives data via children; handles skeleton state uniformly.
 */
export function InsightCard({ title, isLoading = false, children, className = '' }: InsightCardProps) {
  return (
    <Card className={`flex flex-col gap-4 ${className}`}>
      <h3 className="text-base font-heading font-semibold text-on-surface">{title}</h3>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="w-full h-6 rounded" />
          <Skeleton className="w-3/4 h-6 rounded" />
          <Skeleton className="w-5/6 h-6 rounded" />
        </div>
      ) : (
        children
      )}
    </Card>
  );
}
