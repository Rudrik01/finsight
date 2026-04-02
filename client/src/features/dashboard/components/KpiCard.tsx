import { Card } from '../../../components/ui/Card';
import { formatCurrency, formatDelta } from '../../../utils/currency';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  amount: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export function KpiCard({ title, amount, change }: KpiCardProps) {
  const isPositive = change > 0;
  
  return (
    <Card className="relative group">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-sm font-label text-on-surface-variant mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-numeric font-bold tracking-tight text-on-surface drop-shadow-glow-primary">
          {formatCurrency(amount)}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : change < 0 ? 'text-danger' : 'text-on-surface-variant'}`}>
          {isPositive && <TrendingUp size={16} />}
          {change < 0 && <TrendingDown size={16} />}
          {change === 0 && <Minus size={16} />}
          <span className="font-numeric">{formatDelta(change)}</span>
        </div>
      </div>
    </Card>
  );
}
