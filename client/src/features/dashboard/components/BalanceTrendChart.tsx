import { useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { IMonthlyData } from '@/types';
import { formatCurrency } from '../../../utils/currency';
import { useThemeStore } from '../../../store/useThemeStore';

export function BalanceTrendChart({ data, isLoading }: { data: IMonthlyData[], isLoading: boolean }) {
  const theme = useThemeStore((state) => state.theme);
  // SVG fill can't use CSS custom property channels directly — resolve at runtime
  const tickColor = theme === 'dark' ? 'rgb(248, 249, 255)' : 'rgb(13, 28, 45)';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const chartData = useMemo(() => data.map(d => ({
    name: d.month,
    Savings: d.income - d.expense,
  })), [data]);


  return (
    <Card className="col-span-1 md:col-span-2 h-[400px]">
      <h2 className="text-lg font-heading font-medium mb-6">Savings Trend</h2>
      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-surface-variant/50 rounded-lg"></div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(var(--color-primary-500))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="rgb(var(--color-primary-500))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: tickColor, fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: tickColor, fontSize: 12, fontFamily: 'IBM Plex Mono' }}
                tickFormatter={(val) => `$${val/1000}k`}
                width={60}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgb(var(--color-surface-container-highest))', border: '1px solid rgb(var(--color-outline-variant) / 0.2)', borderRadius: '8px', color: 'rgb(var(--color-on-surface))' }}
                itemStyle={{ fontFamily: 'IBM Plex Mono', color: 'rgb(var(--color-on-surface))' }}
                labelStyle={{ color: 'rgb(var(--color-on-surface-variant))', marginBottom: '8px' }}
                formatter={(val: number | string | readonly (string | number)[] | undefined) => [formatCurrency(Number(val)), 'Savings']}
              />
              <Area type="monotone" dataKey="Savings" stroke="rgb(var(--color-primary-500))" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
