import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { TransactionRow } from './TransactionRow';
import { useRoleStore } from '@/store/useRoleStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useToastStore } from '@/store/useToastStore';
import type { ITransaction } from '@/types';

interface TransactionTableProps {
  transactions: ITransaction[];
  isLoading: boolean;
  onEdit: (t: ITransaction) => void;
}

export function TransactionTable({ transactions, isLoading, onEdit }: TransactionTableProps) {
  const role = useRoleStore((state) => state.role);
  const isAdmin = role === 'admin';
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  const addToast = useToastStore((state) => state.addToast);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /** useCallback: passed as prop to memoised TransactionRow — prevents row re-renders */
  const handleEdit = useCallback((t: ITransaction) => onEdit(t), [onEdit]);

  /** useCallback: passed as prop to memoised TransactionRow — prevents row re-renders */
  const handleDeleteRequest = useCallback((id: string) => setPendingDeleteId(id), []);

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    try {
      await deleteTransaction(pendingDeleteId);
      addToast('Transaction deleted', 'success');
    } catch {
      addToast('Failed to delete transaction', 'error');
    } finally {
      setIsDeleting(false);
      setPendingDeleteId(null);
    }
  };

  const colSpan = isAdmin ? 5 : 4;

  return (
    <>
      <Card noPadding className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(199,196,215,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(199,196,215,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="relative overflow-x-auto w-full z-10">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surface/80 backdrop-blur-sm z-20">
              <tr className="border-b border-outline-variant/10">
                <th className="px-6 py-4 text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                {isAdmin && (
                  <th className="px-6 py-4 text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={colSpan} className="px-6 py-4">
                    <div className="space-y-3">
                      <TableRowSkeleton columns={colSpan} />
                      <TableRowSkeleton columns={colSpan} />
                      <TableRowSkeleton columns={colSpan} />
                      <TableRowSkeleton columns={colSpan} />
                      <TableRowSkeleton columns={colSpan} />
                    </div>
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={colSpan}>
                    <EmptyState
                      title="No transactions found"
                      message="Try adjusting your search or filters to find what you're looking for."
                    />
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <TransactionRow
                    key={t.id}
                    transaction={t}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={pendingDeleteId !== null}
        onClose={() => setPendingDeleteId(null)}
        title="Delete Transaction"
      >
        <div className="space-y-5">
          <p className="text-sm text-on-surface-variant">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setPendingDeleteId(null)}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-surface-variant/30 hover:bg-surface-variant/50 text-on-surface transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-danger/90 hover:bg-danger text-white transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
