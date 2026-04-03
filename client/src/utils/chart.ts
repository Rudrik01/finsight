/**
 * Pure chart data transformation helpers
 * Converts raw API data into shapes expected by Recharts
 */
import type { IMonthlyData, ICategoryBreakdown } from '@/types';
import { CATEGORY_META } from '@/constants/categories';

export interface IMonthlyChartPoint {
  name: string;
  Income: number;
  Expense: number;
  Savings: number;
}

export interface ICategoryChartPoint {
  name: string;
  value: number;
  color: string;
}

/**
 * Transforms monthly API data into a format suitable for a Recharts BarChart/AreaChart
 */
export function transformMonthlyForChart(data: IMonthlyData[]): IMonthlyChartPoint[] {
  return data.map((d) => ({
    name: d.month,
    Income: d.income,
    Expense: d.expense,
    Savings: d.income - d.expense,
  }));
}

/**
 * Transforms category breakdown data into Recharts PieChart format with colors
 */
export function transformCategoryForChart(data: ICategoryBreakdown[]): ICategoryChartPoint[] {
  return data.map((d) => ({
    name: CATEGORY_META[d.category as keyof typeof CATEGORY_META]?.label || d.category,
    value: d.amount,
    color:
      CATEGORY_META[d.category as keyof typeof CATEGORY_META]?.color ||
      'rgb(var(--color-outline-variant))',
  }));
}
