/**
 * UI-only type definitions — FinSight frontend
 * These types are exclusive to UI state and never sent to the API
 */

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface IToast {
  id: string;
  message: string;
  variant: ToastVariant;
}

export type ThemeType = 'dark' | 'light';

/** Form state for Add/Edit transaction modal */
export interface ITransactionFormData {
  amount: string;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
}

/** KPI card display props */
export interface IKpiDisplay {
  title: string;
  amount: number;
  change: number;
  trend: 'up' | 'down';
}
