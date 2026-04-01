import { axiosInstance } from './axiosInstance';
import type { ITransaction, ITransactionQueryParams } from '@/types';

export const transactionService = {
  /**
   * Fetches transactions from the API based on the provided query parameters.
   * Query parameters are stringified into a query string.
   * @param params Filter and pagination options
   * @returns Array of transactions
   */
  getTransactions: async (params?: ITransactionQueryParams): Promise<ITransaction[]> => {
    const qs = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    const response = await axiosInstance.get<never, { data: ITransaction[] }>(`/transactions?${qs}`);
    return response.data; // Note: axiosInterceptor returns IApiResponse, so we take .data
  },

  /**
   * Creates a new transaction.
   * @param data The payload for the new transaction
   * @returns The newly created transaction
   */
  createTransaction: async (data: Partial<ITransaction>): Promise<ITransaction> => {
    const response = await axiosInstance.post<never, { data: ITransaction }>('/transactions', data);
    return response.data;
  },

  /**
   * Updates an existing transaction by ID.
   * @param id The ID of the transaction to update
   * @param data The updated fields
   * @returns The updated transaction
   */
  updateTransaction: async (id: string, data: Partial<ITransaction>): Promise<ITransaction> => {
    const response = await axiosInstance.put<never, { data: ITransaction }>(`/transactions/${id}`, data);
    return response.data;
  },

  /**
   * Deletes a transaction by ID.
   * @param id The ID of the transaction to delete
   * @returns The ID of the deleted transaction
   */
  deleteTransaction: async (id: string): Promise<{ id: string }> => {
    const response = await axiosInstance.delete<never, { data: { id: string } }>(`/transactions/${id}`);
    return response.data;
  }
};
