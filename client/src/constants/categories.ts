import { CategoryType, type TransactionCategory, TransactionType } from '@/types';

export const CATEGORY_META: Record<TransactionCategory, { label: string; color: string; type: TransactionType }> = {
  [CategoryType.FOOD]: { label: '🍔 Food & Dining', color: 'rgb(var(--color-primary-500))', type: TransactionType.EXPENSE },
  [CategoryType.TRANSPORT]: { label: '🚗 Transportation', color: 'rgb(var(--color-secondary-500))', type: TransactionType.EXPENSE },
  [CategoryType.HOUSING]: { label: '🏠 Housing & Rent', color: 'rgb(var(--color-tertiary-500))', type: TransactionType.EXPENSE },
  [CategoryType.ENTERTAINMENT]: { label: '🎬 Entertainment', color: 'rgb(var(--color-on-surface-variant))', type: TransactionType.EXPENSE },
  [CategoryType.HEALTHCARE]: { label: '💊 Healthcare', color: 'rgb(var(--color-danger-500))', type: TransactionType.EXPENSE },
  [CategoryType.SHOPPING]: { label: '🛍️ Shopping', color: 'rgb(var(--color-warning-500))', type: TransactionType.EXPENSE },
  [CategoryType.UTILITIES]: { label: '💡 Bills & Utilities', color: 'rgb(var(--color-primary-400))', type: TransactionType.EXPENSE },
  [CategoryType.SALARY]: { label: '💰 Salary & Wages', color: 'rgb(var(--color-success-500))', type: TransactionType.INCOME },
  [CategoryType.SAVINGS]: { label: '📈 Savings & Investments', color: 'rgb(var(--color-success-400))', type: TransactionType.INCOME },
  [CategoryType.OTHER]: { label: '📦 Other', color: 'rgb(var(--color-outline-variant))', type: TransactionType.EXPENSE },
};
