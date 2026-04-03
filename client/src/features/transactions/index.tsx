import { useState, useCallback } from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { TransactionFilters } from './components/TransactionFilters';
import { TransactionTable } from './components/TransactionTable';
import { TransactionForm } from './components/TransactionForm';
import { useTransactions } from './hooks/useTransactions';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useFilterStore } from '@/store/useFilterStore';
import type { ITransaction } from '@/types';

export default function TransactionsPage() {
  const { isLoading, error, refetch } = useTransactions();
  const transactions = useTransactionStore((state) => state.transactions);
  const role = useRoleStore((state) => state.role);
  const { filters, setFilter, resetFilters } = useFilterStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | undefined>();

  /** useCallback: passed to TransactionTable → TransactionRow (memoised child) */
  const handleEdit = useCallback((t: ITransaction) => {
    setTransactionToEdit(t);
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setTransactionToEdit(undefined);
  }, []);

  const handleExport = () => {
    const header = 'Date,Description,Category,Type,Amount';
    const rows = transactions.map(
      (t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finsight-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Transactions</h1>
          <p className="text-on-surface-variant text-sm">Manage and view all your financial records.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleExport} variant="secondary" className="gap-2">
            <Download size={16} />
            Export CSV
          </Button>
          {role === 'admin' && (
            <Button onClick={() => { setTransactionToEdit(undefined); setIsFormOpen(true); }} className="gap-2">
              <Plus size={16} />
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && !isLoading && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {/* Filters row */}
      {!error && (
        <>
          <TransactionFilters filters={filters} setFilter={setFilter} resetFilters={resetFilters} />

          <TransactionTable
            transactions={transactions}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </>
      )}

      <TransactionForm
        isOpen={isFormOpen}
        transactionToEdit={transactionToEdit}
        onClose={handleFormClose}
      />
    </div>
  );
}
