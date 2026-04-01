import { axiosInstance } from './axiosInstance';
import type { ISummary, IMonthlyData, ICategoryBreakdown } from '@/types';

export const insightService = {
  /**
   * Fetches high-level summary KPIs including total balance, income, expenses, and their changes.
   * @returns The summary data
   */
  getSummary: async (): Promise<ISummary> => {
    const response = await axiosInstance.get<never, { data: ISummary }>('/insights/summary');
    return response.data;
  },

  /**
   * Fetches the monthly aggregate data for income and expenses over the last several months.
   * Used primarily for trend charts (e.g., month-over-month comparisons).
   * @returns Array of monthly aggregated data
   */
  getMonthly: async (): Promise<IMonthlyData[]> => {
    const response = await axiosInstance.get<never, { data: IMonthlyData[] }>('/insights/monthly');
    return response.data;
  },

  /**
   * Fetches the breakdown of spending across different categories.
   * Ideal for donut charts and top-expense progress bars.
   * @returns Array of category breakdown data
   */
  getCategories: async (): Promise<ICategoryBreakdown[]> => {
    const response = await axiosInstance.get<never, { data: ICategoryBreakdown[] }>('/insights/categories');
    return response.data;
  }
};
