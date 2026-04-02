import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { InsightCard } from './InsightCard';
import { formatCurrency } from '@/utils/currency';
import type { IMonthlyData } from '@/types';

interface SavingsTrendCardProps {
  monthly: IMonthlyData[];
  isLoading: boolean;
}

/**
 * SavingsTrendCard — Month-over-month savings comparison.
 * useMemo: derives current/previous savings from monthly array;
 * avoids re-computation on every parent render while data is stable.
 */
export function SavingsTrendCard({ monthly, isLoading }: SavingsTrendCardProps) {
  const comparison = useMemo(() => {
    if (monthly.length < 2) return null;
    const current = monthly[monthly.length - 1];
    const previous = monthly[monthly.length - 2];
    const currentSavings = current.income - current.expense;
    const previousSavings = previous.income - previous.expense;
    const delta = currentSavings - previousSavings;
    const pct = previousSavings !== 0 ? ((delta / Math.abs(previousSavings)) * 100).toFixed(1) : '0.0';
    return { current, previous, currentSavings, previousSavings, delta, pct };
  }, [monthly]);

  return (
    <InsightCard title="Month-over-Month" isLoading={isLoading}>
      {comparison ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-variant/20 rounded-xl p-4 space-y-1">
              <p className="text-xs text-on-surface-variant">{comparison.previous.month}</p>
              <p className="text-lg font-numeric font-bold tabular-nums text-on-surface">
                {formatCurrency(comparison.previousSavings)}
              </p>
              <p className="text-xs text-on-surface-variant">Savings</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-4 space-y-1 border border-primary/20">
              <p className="text-xs text-primary">{comparison.current.month}</p>
              <p className="text-lg font-numeric font-bold tabular-nums text-primary">
                {formatCurrency(comparison.currentSavings)}
              </p>
              <p className="text-xs text-primary/70">Savings</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
            ${comparison.delta > 0 ? 'bg-emerald-400/10 text-emerald-400'
              : comparison.delta < 0 ? 'bg-danger/10 text-danger'
              : 'bg-surface-variant/30 text-on-surface-variant'}`}
          >
            {comparison.delta > 0 ? <TrendingUp size={16} />
              : comparison.delta < 0 ? <TrendingDown size={16} />
              : <Minus size={16} />}
            <span>
              {comparison.delta >= 0 ? '+' : ''}{formatCurrency(comparison.delta)} ({comparison.pct}%)
              {' '}vs last month
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {[comparison.current, comparison.previous].map((m, i) => (
              <div key={m.month} className="grid grid-cols-3 text-sm gap-2">
                <span className={`font-medium ${i === 0 ? 'text-primary' : 'text-on-surface-variant'}`}>{m.month}</span>
                <span className="text-emerald-400 tabular-nums text-right">+{formatCurrency(m.income)}</span>
                <span className="text-danger/80 tabular-nums text-right">-{formatCurrency(m.expense)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-on-surface-variant">Not enough data for comparison.</p>
      )}
    </InsightCard>
  );
}
