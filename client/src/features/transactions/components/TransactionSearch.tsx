import { Search } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

/**
 * TransactionSearch — Standalone debounced search input.
 * Writes to useFilterStore after 300ms debounce per AGENT.md §14.
 */
export function TransactionSearch() {
  const setFilter = useFilterStore((state) => state.setFilter);
  const [localValue, setLocalValue] = useState('');
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    setFilter('search', debouncedValue || undefined);
  }, [debouncedValue, setFilter]);

  return (
    <div className="relative flex-1">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 pointer-events-none" />
      <input
        type="text"
        placeholder="Search transactions..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full bg-surface-variant/10 hover:bg-surface-variant/20 border border-outline-variant/30 rounded-lg py-2.5 pl-9 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
    </div>
  );
}
