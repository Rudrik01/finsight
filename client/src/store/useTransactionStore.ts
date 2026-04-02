import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ITransaction, ITransactionQueryParams } from '@/types';
import { transactionService } from '../services/transactionService';

interface TransactionState {
  transactions: ITransaction[];
  isLoading: boolean;
  error: string | null;
}

interface TransactionActions {
  fetchTransactions: (params?: ITransactionQueryParams) => Promise<void>;
  addTransaction: (data: Partial<ITransaction>) => Promise<void>;
  updateTransaction: (id: string, data: Partial<ITransaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

type TransactionStore = TransactionState & TransactionActions;

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
};

export const useTransactionStore = create<TransactionStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchTransactions: async (params) => {
        set({ isLoading: true, error: null }, false, 'transactions/fetchRequest');
        try {
          const transactions = await transactionService.getTransactions(params);
          set({ transactions, isLoading: false }, false, 'transactions/fetchSuccess');
        } catch (error: unknown) {
          set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false }, false, 'transactions/fetchError');
        }
      },

      addTransaction: async (data) => {
        set({ isLoading: true, error: null }, false, 'transactions/addRequest');
        try {
          const newTx = await transactionService.createTransaction(data);
          set({ transactions: [newTx, ...get().transactions], isLoading: false }, false, 'transactions/addSuccess');
        } catch (error: unknown) {
          set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false }, false, 'transactions/addError');
          throw error;
        }
      },

      updateTransaction: async (id, data) => {
        set({ isLoading: true, error: null }, false, 'transactions/updateRequest');
        try {
          const updatedTx = await transactionService.updateTransaction(id, data);
          set({ 
            transactions: get().transactions.map(t => t.id === id ? updatedTx : t),
            isLoading: false 
          }, false, 'transactions/updateSuccess');
        } catch (error: unknown) {
          set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false }, false, 'transactions/updateError');
          throw error;
        }
      },

      deleteTransaction: async (id) => {
        set({ isLoading: true, error: null }, false, 'transactions/deleteRequest');
        try {
          await transactionService.deleteTransaction(id);
          set({ 
            transactions: get().transactions.filter(t => t.id !== id),
            isLoading: false 
          }, false, 'transactions/deleteSuccess');
        } catch (error: unknown) {
          set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false }, false, 'transactions/deleteError');
          throw error;
        }
      }
    }),
    { name: 'TransactionStore' }
  )
);
