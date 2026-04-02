import { memo, useCallback } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { CATEGORY_META } from '@/constants/categories';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import type { ITransaction } from '@/types';

interface TransactionRowProps {
  transaction: ITransaction;
  isAdmin: boolean;
  onEdit: (t: ITransaction) => void;
  onDelete: (id: string) => void;
}

/**
 * TransactionRow — Memoised single-row component.
 * React.memo: parent TransactionTable re-renders on every filter/sort change;
 * row props are stable references when useCallback is used on parent handlers.
 */
export const TransactionRow = memo(function TransactionRow({
  transaction: t,
  isAdmin,
  onEdit,
  onDelete,
}: TransactionRowProps) {
  const meta = CATEGORY_META[t.category];
  const isIncome = t.type === 'INCOME';

  const handleEdit = useCallback(() => onEdit(t), [onEdit, t]);
  const handleDelete = useCallback(() => onDelete(t.id!), [onDelete, t.id]);

  return (
    <tr className="border-b border-outline-variant/5 hover:bg-surface-variant/20 transition-colors group">
      <td className="px-6 py-4 text-sm text-on-surface-variant whitespace-nowrap">
        {formatDate(t.date)}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-on-surface max-w-[200px] truncate">
        {t.description}
      </td>
      <td className="px-6 py-4">
        <Badge color={meta?.color}>{meta?.label || t.category}</Badge>
      </td>
      <td className={`px-6 py-4 text-right font-numeric font-semibold tabular-nums ${isIncome ? 'text-emerald-400' : 'text-on-surface'}`}>
        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
      </td>
      {isAdmin && (
        <td className="px-6 py-4 text-right">
          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              title="Edit transaction"
              className="p-1.5 rounded-md hover:bg-primary/10 hover:text-primary text-on-surface-variant transition-colors"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={handleDelete}
              title="Delete transaction"
              className="p-1.5 rounded-md hover:bg-danger/10 hover:text-danger text-on-surface-variant transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
});
