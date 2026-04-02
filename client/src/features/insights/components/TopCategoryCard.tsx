import { useMemo } from 'react';
import { InsightCard } from './InsightCard';
import { CATEGORY_META } from '@/constants/categories';
import { formatCurrency } from '@/utils/currency';
import type { ICategoryBreakdown } from '@/types';

interface TopCategoryCardProps {
  categories: ICategoryBreakdown[];
  isLoading: boolean;
}

/**
 * TopCategoryCard — Shows top 5 spending categories with progress bars.
 * useMemo: sorts and slices category array (10 items) on every insight render;
 * avoids redundant computation when parent re-renders due to isLoading flip.
 */
export function TopCategoryCard({ categories, isLoading }: TopCategoryCardProps) {
  const topCategories = useMemo(() => {
    return [...categories]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [categories]);

  const maxAmount = topCategories[0]?.amount ?? 1;

  return (
    <InsightCard title="Top Spending Categories" isLoading={isLoading}>
      <div className="space-y-4">
        {topCategories.map((cat) => {
          const meta = CATEGORY_META[cat.category as keyof typeof CATEGORY_META];
          const pct = Math.round((cat.amount / maxAmount) * 100);
          return (
            <div key={cat.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-on-surface">{meta?.label || cat.category}</span>
                <span className="font-numeric text-on-surface-variant tabular-nums">
                  {formatCurrency(cat.amount)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-variant/40 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${pct}%`, backgroundColor: meta?.color || 'rgb(var(--color-primary))' }}
                />
              </div>
              <p className="text-xs text-on-surface-variant">{cat.percentage?.toFixed(1)}% of total spend</p>
            </div>
          );
        })}
      </div>
    </InsightCard>
  );
}
