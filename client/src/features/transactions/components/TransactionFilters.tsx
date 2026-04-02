import type { ITransactionQueryParams } from '@/types';
import { TransactionType } from '@/types';
import { Button } from '../../../components/ui/Button';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

interface TransactionFiltersProps {
  filters: ITransactionQueryParams;
  setFilter: <K extends keyof ITransactionQueryParams>(key: K, value: ITransactionQueryParams[K] | undefined) => void;
  resetFilters: () => void;
}

export function TransactionFilters({ filters, setFilter, resetFilters }: TransactionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilter('search', debouncedSearch);
    }
  }, [debouncedSearch, setFilter, filters.search]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10" />
        <input 
          type="text" 
          placeholder="Search descriptions..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full relative z-0 bg-surface-variant/10 hover:bg-surface-variant/20 border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary text-sm focus:outline-none transition-colors"
        />
      </div>
      
      <div className="flex gap-4">
        <select 
          value={filters.type || ''}
          onChange={(e) => setFilter('type', (e.target.value as TransactionType) || undefined)}
          className="bg-surface-variant/10 hover:bg-surface-variant/20 border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer outline-none"
        >
          <option value="">All Types</option>
          <option value={TransactionType.INCOME}>Income</option>
          <option value={TransactionType.EXPENSE}>Expense</option>
        </select>
        
        <select 
          value={filters.sortBy || ''}
          onChange={(e) => setFilter('sortBy', (e.target.value as "date" | "amount") || undefined)}
          className="bg-surface-variant/10 hover:bg-surface-variant/20 border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer outline-none"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        
        <select 
          value={filters.sortOrder || ''}
          onChange={(e) => setFilter('sortOrder', (e.target.value as "asc" | "desc") || 'desc')}
          className="bg-surface-variant/10 hover:bg-surface-variant/20 border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer outline-none"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <Button variant="secondary" onClick={resetFilters}>Clear Filters</Button>
      </div>
    </div>
  );
}
