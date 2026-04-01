import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/apiResponse';
import { transactions as db } from '../data/seed';
import { TransactionType, CategoryType, ISummary, IMonthlyData, ICategoryBreakdown } from '../../../shared/types';

// Random delay between 150ms and 400ms
const simulateLatency = () => new Promise(resolve => setTimeout(resolve, Math.random() * 250 + 150));

export const getSummary = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    
    let totalIncome = 0;
    let totalExpenses = 0;
    
    db.forEach(t => {
      if (t.type === TransactionType.INCOME) totalIncome += t.amount;
      if (t.type === TransactionType.EXPENSE) totalExpenses += t.amount;
    });

    const summary: ISummary = {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      incomeChange: 5.2, // mock metric
      expenseChange: -1.5, // mock metric
      balanceChange: 2.1,
    };

    sendResponse(res, 200, summary, 'Summary generated successfully');
  } catch (err) {
    next(err);
  }
};

export const getMonthly = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    
    const monthlyMap: Record<string, IMonthlyData> = {};
    
    db.forEach(t => {
      const ms = new Date(t.date);
      const monthStr = ms.toLocaleString('en-US', { month: 'short' });
      
      if (!monthlyMap[monthStr]) {
        monthlyMap[monthStr] = { month: monthStr, income: 0, expense: 0 };
      }
      
      if (t.type === TransactionType.INCOME) monthlyMap[monthStr].income += t.amount;
      if (t.type === TransactionType.EXPENSE) monthlyMap[monthStr].expense += t.amount;
    });

    // Provide ordered sort ideally, but for mock, values are ordered roughly
    const arr = Object.values(monthlyMap);
    sendResponse(res, 200, arr, 'Monthly insights fetched');
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    
    const catMap: Record<string, number> = {};
    let totalExes = 0;
    
    db.forEach(t => {
      if (t.type === TransactionType.EXPENSE) {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
        totalExes += t.amount;
      }
    });

    const breakdown: ICategoryBreakdown[] = Object.entries(catMap).map(([key, amount]) => ({
      category: key as CategoryType,
      amount,
      percentage: totalExes ? (amount / totalExes) * 100 : 0
    })).sort((a,b) => b.amount - a.amount);

    sendResponse(res, 200, breakdown, 'Category breakdown fetched');
  } catch (err) {
    next(err);
  }
};
