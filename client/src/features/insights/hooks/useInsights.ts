import { useState, useEffect, useCallback } from 'react';
import { insightService } from '@/services/insightService';
import type { ISummary, IMonthlyData, ICategoryBreakdown } from '@/types';

/**
 * useInsights — Data-fetching hook for the Insights page.
 * Returns typed data for summary, monthly, and category breakdown.
 * Each call is parallel via Promise.all.
 */
export function useInsights() {
  const [summary, setSummary] = useState<ISummary | null>(null);
  const [monthly, setMonthly] = useState<IMonthlyData[]>([]);
  const [categories, setCategories] = useState<ICategoryBreakdown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sum, mon, cats] = await Promise.all([
        insightService.getSummary(),
        insightService.getMonthly(),
        insightService.getCategories(),
      ]);
      setSummary(sum);
      setMonthly(mon);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load insights');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { summary, monthly, categories, isLoading, error, refetch: fetch };
}
