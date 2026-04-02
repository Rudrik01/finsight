import type { ITransaction } from '@/types';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { formatCurrency } from '../../../utils/currency';
import { formatRelativeDate } from '../../../utils/date';
import { CATEGORY_META } from '../../../constants/categories';
import { TableRowSkeleton } from '../../../components/ui/Skeleton';

export function RecentTransactions({ transactions, isLoading }: { transactions: ITransaction[], isLoading: boolean }) {
  return (
    <Card className="flex-1 min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-medium">Recent Transactions</h2>
        <a href="/transactions" className="text-sm text-primary hover:text-primary-variant transition-colors">View All</a>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} columns={4} />)
        ) : transactions.length > 0 ? (
          transactions.map(t => {
            const meta = CATEGORY_META[t.category];
            const isIncome = t.type === 'INCOME';
            
            return (
              <div key={t.id} className="flex items-center justify-between py-3 border-b border-outline-variant/50 last:border-0 hover:bg-surface-variant/30 px-2 -mx-2 rounded transition-colors group">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `color-mix(in srgb, ${meta?.color || 'gray'} 20%, transparent)` }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta?.color || 'gray' }}></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-on-surface">{t.description}</p>
                    <p className="text-xs text-on-surface-variant">{formatRelativeDate(t.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge color={meta?.color}>{meta?.label || t.category}</Badge>
                  <span className={`font-numeric font-medium w-24 text-right ${isIncome ? 'text-success' : 'text-on-surface'}`}>
                    {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-on-surface-variant">No transactions found</div>
        )}
      </div>
    </Card>
  );
}
