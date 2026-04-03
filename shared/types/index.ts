export const TransactionType = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export const CategoryType = {
  FOOD: 'FOOD',
  TRANSPORT: 'TRANSPORT',
  HOUSING: 'HOUSING',
  ENTERTAINMENT: 'ENTERTAINMENT',
  HEALTHCARE: 'HEALTHCARE',
  SHOPPING: 'SHOPPING',
  UTILITIES: 'UTILITIES',
  SALARY: 'SALARY',
  SAVINGS: 'SAVINGS',
  OTHER: 'OTHER',
} as const;

export type TransactionCategory = typeof CategoryType[keyof typeof CategoryType];

export interface ITransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface IApiError {
  success: false;
  error: string;
  code: string;
  timestamp: string;
}

export type RoleType = 'admin' | 'viewer';

export interface ISummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  incomeChange: number;
  expenseChange: number;
  balanceChange: number;
}

export interface IMonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface ICategoryBreakdown {
  category: TransactionCategory;
  amount: number;
  percentage: number;
}

export interface ITransactionQueryParams {
  limit?: number;
  page?: number;
  type?: TransactionType;
  category?: TransactionCategory;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: 'date' | 'amount';
  sortOrder?: 'asc' | 'desc';
}
