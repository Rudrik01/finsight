import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useFilterStore } from '../../store/useFilterStore';
import { useTransactionStore } from '../../store/useTransactionStore';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { TransactionType } from '@/types';

export default function Topbar() {
  const { theme, toggleTheme } = useThemeStore();
  const setFilter = useFilterStore((state) => state.setFilter);
  const transactions = useTransactionStore((state) => state.transactions);
  const navigate = useNavigate();
  
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef as React.RefObject<HTMLElement>, () => setShowSuggestions(false));

  // Filter transactions based on search value
  const suggestions = useMemo(() => {
    if (!searchValue.trim()) return [];
    
    const query = searchValue.toLowerCase();
    return transactions
      .filter(t => 
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limit to 5 suggestions
  }, [searchValue, transactions]);

  // Update filter store when debounced value changes
  useEffect(() => {
    setFilter('search', debouncedSearchValue || undefined);
  }, [debouncedSearchValue, setFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true);
    setFocusedIndex(-1);
  };

  const handleSuggestionClick = (description: string) => {
    setSearchValue(description);
    setShowSuggestions(false);
    navigate('/transactions');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedIndex].description);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <header className="h-20 bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 border-b border-outline-variant/10">
      <div className="w-96 relative" ref={searchRef}>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchValue && setShowSuggestions(true)}
            className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-on-surface placeholder:text-on-surface-variant"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-surface-container rounded-lg shadow-lg border border-outline-variant/20 overflow-hidden z-50">
            {suggestions.map((transaction, index) => (
              <button
                key={transaction.id}
                onClick={() => handleSuggestionClick(transaction.description)}
                className={`w-full px-4 py-3 text-left hover:bg-surface-variant transition-colors flex items-center justify-between ${
                  index === focusedIndex ? 'bg-surface-variant' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-on-surface truncate">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    {transaction.category} • {formatDate(transaction.date)}
                  </div>
                </div>
                <div className={`text-sm font-semibold ml-3 ${
                  transaction.type === TransactionType.INCOME ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-variant transition-colors">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
