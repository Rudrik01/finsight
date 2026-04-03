import { useState, type FormEvent, useEffect } from 'react';
import { useTransactionStore } from '../../../store/useTransactionStore';
import { useToastStore } from '../../../store/useToastStore';
import { CategoryType, type ITransaction, type TransactionCategory } from '@shared/types';
import { Modal } from '../../../components/ui/Modal';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: ITransaction;
}

export function TransactionForm({ isOpen, onClose, transactionToEdit }: TransactionFormProps) {
  const { addTransaction, updateTransaction } = useTransactionStore();
  const addToast = useToastStore((state) => state.addToast);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    category: CategoryType.OTHER as TransactionCategory,
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        amount: transactionToEdit.amount.toString(),
        description: transactionToEdit.description,
        type: transactionToEdit.type,
        category: transactionToEdit.category,
        date: new Date(transactionToEdit.date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        amount: '',
        description: '',
        type: 'EXPENSE',
        category: CategoryType.OTHER as TransactionCategory,
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [transactionToEdit, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        amount: Number(formData.amount),
        description: formData.description,
        type: formData.type,
        category: formData.category,
        date: new Date(formData.date).toISOString()
      };

      if (transactionToEdit) {
        await updateTransaction(transactionToEdit.id!, payload);
        addToast('Transaction updated successfully', 'success');
      } else {
        await addTransaction(payload);
        addToast('Transaction created successfully', 'success');
      }
      onClose();
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to save transaction', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-on-surface">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'INCOME' | 'EXPENSE' }))}
              className="bg-surface-container-highest border border-outline-variant/20 rounded-md px-3 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-on-surface">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-surface-container-highest border border-outline-variant/20 rounded-md px-3 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary [color-scheme:dark] [data-theme='light']:[color-scheme:light]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-on-surface-variant font-mono">$</span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-md pl-8 pr-3 py-2 text-on-surface font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as TransactionCategory }))}
            className="bg-surface-container-highest border border-outline-variant/20 rounded-md px-3 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {Object.values(CategoryType).map(cat => (
              <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface">Description (Optional)</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="e.g. Server hosting fee"
            className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-md px-3 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-outline-variant rounded-md text-on-surface hover:bg-surface-variant font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gradient-to-br from-primary to-primary-variant text-on-primary rounded-md font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Transaction'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
