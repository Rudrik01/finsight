/**
 * Pure utility functions for transaction filtering and sorting
 * Zero side-effects — all functions are deterministic
 */
import type { ITransaction } from '@/types';
import type { ITransactionQueryParams } from '@/types';

/**
 * Filters a transaction array by type, category, date range, and search term
 */
export function filterTransactions(
  transactions: ITransaction[],
  filters: ITransactionQueryParams
): ITransaction[] {
  return transactions.filter((t) => {
    if (filters.type && t.type !== filters.type) return false;
    if (filters.category && t.category !== filters.category) return false;
    if (filters.startDate && new Date(t.date) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(t.date) > new Date(filters.endDate)) return false;
    if (filters.search) {
      const term = filters.search.toLowerCase();
      if (!t.description.toLowerCase().includes(term)) return false;
    }
    return true;
  });
}

/**
 * Sorts a transaction array by the given field and order
 */
export function sortTransactions(
  transactions: ITransaction[],
  sortBy: string = 'date',
  sortOrder: 'asc' | 'desc' = 'desc'
): ITransaction[] {
  return [...transactions].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
