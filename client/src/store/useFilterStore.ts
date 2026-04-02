import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ITransactionQueryParams } from '@/types';

interface FilterState {
  filters: ITransactionQueryParams;
}

interface FilterActions {
  setFilter: <K extends keyof ITransactionQueryParams>(key: K, value: ITransactionQueryParams[K]) => void;
  resetFilters: () => void;
}

type FilterStore = FilterState & FilterActions;

const initialState: FilterState = {
  filters: {
    limit: 10,
    page: 1,
  },
};

export const useFilterStore = create<FilterStore>()(
  devtools(
    (set, _get) => ({
      ...initialState,
      
      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value, page: key !== 'page' ? 1 : value } as unknown as ITransactionQueryParams
        }), false, 'filters/setFilter');
      },

      resetFilters: () => {
        set(initialState, false, 'filters/reset');
      }
    }),
    { name: 'FilterStore' }
  )
);
