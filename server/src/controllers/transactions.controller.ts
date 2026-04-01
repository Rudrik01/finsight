import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/apiResponse';
import { transactions as initialData } from '../data/seed';
import { ITransaction, ITransactionQueryParams } from '../../../shared/types';
import { v4 as uuidv4 } from 'uuid';

let db = [...initialData];

// Random delay between 150ms and 400ms
const simulateLatency = () => new Promise(resolve => setTimeout(resolve, Math.random() * 250 + 150));

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    const query = req.query as unknown as ITransactionQueryParams;
    
    let result = [...db];

    if (query.type) {
      result = result.filter(t => t.type === query.type);
    }
    if (query.category) {
      result = result.filter(t => t.category === query.category);
    }
    if (query.startDate) {
      result = result.filter(t => new Date(t.date) >= new Date(query.startDate as string));
    }
    if (query.endDate) {
      result = result.filter(t => new Date(t.date) <= new Date(query.endDate as string));
    }
    if (query.search) {
      const search = query.search.toLowerCase();
      result = result.filter(t => t.description.toLowerCase().includes(search));
    }

    if (query.sortBy) {
      const order = query.sortOrder === 'asc' ? 1 : -1;
      result.sort((a, b) => {
        if (query.sortBy === 'date') {
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
        } else if (query.sortBy === 'amount') {
          return (a.amount - b.amount) * order;
        }
        return 0;
      });
    } else {
      // Default sort by date desc
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Pagination
    const limit = Number(query.limit) || 100;
    const page = Number(query.page) || 1;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    sendResponse(res, 200, paginated, 'Transactions fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    const data = req.body;
    
    if (!data.description || !data.amount || !data.type || !data.category || !data.date) {
      const err = new Error('Missing required fields') as Error & { status?: number; code?: string };
      err.status = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }

    const t: ITransaction = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.push(t);
    sendResponse(res, 201, t, 'Transaction created');
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    const id = req.params.id;
    const index = db.findIndex(t => t.id === id);
    if (index === -1) {
      const err = new Error('Transaction not found') as Error & { status?: number; code?: string };
      err.status = 404;
      err.code = 'TRANSACTION_NOT_FOUND';
      throw err;
    }

    db[index] = { ...db[index], ...req.body, updatedAt: new Date().toISOString() };
    sendResponse(res, 200, db[index], 'Transaction updated');
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await simulateLatency();
    const id = req.params.id;
    const index = db.findIndex(t => t.id === id);
    if (index === -1) {
      const err = new Error('Transaction not found') as Error & { status?: number; code?: string };
      err.status = 404;
      err.code = 'TRANSACTION_NOT_FOUND';
      throw err;
    }
    
    db.splice(index, 1);
    sendResponse(res, 200, { id }, 'Transaction deleted');
  } catch (err) {
    next(err);
  }
};
