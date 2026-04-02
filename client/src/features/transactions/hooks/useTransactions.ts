import { useEffect, useCallback } from 'react';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useFilterStore } from '@/store/useFilterStore';
import type { ITransactionQueryParams } from '@/types';

/**
 * useTransactions — Data-fetching hook for the Transactions page.
 * Manages loading, error, and refetch state. Uses selector pattern on all stores.
 * Re-fetches whenever filter state changes.
 */
export function useTransactions() {
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const error = useTransactionStore((state) => state.error);
  
  const filters = useFilterStore((state) => state.filters);

  const fetch = useCallback(async () => {
    const params: ITransactionQueryParams = {
      ...(filters.type ? { type: filters.type as ITransactionQueryParams['type'] } : {}),
      ...(filters.category ? { category: filters.category as ITransactionQueryParams['category'] } : {}),
      ...(filters.startDate ? { startDate: filters.startDate } : {}),
      ...(filters.endDate ? { endDate: filters.endDate } : {}),
      ...(filters.search ? { search: filters.search } : {}),
      ...(filters.sortBy ? { sortBy: filters.sortBy as ITransactionQueryParams['sortBy'] } : {}),
      ...(filters.sortOrder ? { sortOrder: filters.sortOrder } : {}),
    };
    await fetchTransactions(params);
  }, [filters, fetchTransactions]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { isLoading, error, refetch: fetch };
}
