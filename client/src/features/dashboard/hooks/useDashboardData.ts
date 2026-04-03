import { useEffect, useState } from 'react';
import { useTransactionStore } from '../../../store/useTransactionStore';
import { insightService } from '../../../services/insightService';
import type { ISummary, IMonthlyData, ICategoryBreakdown } from '@/types';

export function useDashboardData() {
  const { transactions, fetchTransactions, isLoading: isTxLoading } = useTransactionStore();
  
  const [summary, setSummary] = useState<ISummary | null>(null);
  const [monthly, setMonthly] = useState<IMonthlyData[]>([]);
  const [categories, setCategories] = useState<ICategoryBreakdown[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchTransactions({ limit: 5 });
        const [sum, mon, cats] = await Promise.all([
          insightService.getSummary(),
          insightService.getMonthly(),
          insightService.getCategories()
        ]);
        setSummary(sum);
        setMonthly(mon);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [fetchTransactions]);

  return {
    transactions,
    summary,
    monthly,
    categories,
    isLoading: isLoading || isTxLoading
  };
}
