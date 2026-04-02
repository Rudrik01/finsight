import { useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { ICategoryBreakdown } from '@/types';
import { CATEGORY_META } from '../../../constants/categories';
import { formatCurrency } from '../../../utils/currency';

export function SpendingDonutChart({ data, isLoading }: { data: ICategoryBreakdown[], isLoading: boolean }) {
  const chartData = useMemo(() => data.slice(0, 5).map(d => ({
    name: CATEGORY_META[d.category]?.label || d.category,
    value: d.amount,
    color: CATEGORY_META[d.category]?.color || 'var(--color-outline-variant)'
  })), [data]);


  return (
    <Card className="col-span-1 h-[400px]">
      <h2 className="text-lg font-heading font-medium mb-6">Top Expenses</h2>
      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-[16px] border-surface-variant animate-pulse"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgb(var(--color-surface-container-highest))', border: '1px solid rgb(var(--color-outline-variant) / 0.2)', borderRadius: '8px', color: 'rgb(var(--color-on-surface))' }}
                itemStyle={{ fontFamily: 'IBM Plex Mono', color: 'rgb(var(--color-on-surface))', fontWeight: 500 }}
                formatter={(val: number | string | readonly (string | number)[] | undefined) => formatCurrency(Number(val))}
              />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(val) => <span className="text-sm text-on-surface ml-1 mr-3">{val}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
