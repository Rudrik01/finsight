import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { InsightCard } from './InsightCard';
import { formatCurrency } from '@/utils/currency';
import { useThemeStore } from '@/store/useThemeStore';
import type { IMonthlyData } from '@/types';

interface MonthlyComparisonChartProps {
  monthly: IMonthlyData[];
  isLoading: boolean;
}

/**
 * MonthlyComparisonChart — Recharts grouped BarChart of income vs expense per month.
 * useMemo: transforms IMonthlyData[] into chart points on every render;
 * prevents redundant transformation when parent re-renders due to unrelated state.
 */
export function MonthlyComparisonChart({ monthly, isLoading }: MonthlyComparisonChartProps) {
  const theme = useThemeStore((state) => state.theme);
  // SVG fill cannot resolve CSS custom property channels — resolve at runtime
  const tickColor = theme === 'dark' ? 'rgb(248,249,255)' : 'rgb(13,28,45)';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  const chartData = useMemo(
    () => monthly.map((d) => ({ name: d.month, Income: d.income, Expense: d.expense })),
    [monthly]
  );

  return (
    <InsightCard title="Monthly Income vs Expenses" isLoading={isLoading} className="col-span-1 lg:col-span-2">
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12, fontFamily: 'IBM Plex Mono' }}
              tickFormatter={(v: number) => `$${v / 1000}k`}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(var(--color-surface-container-highest))',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: tickColor,
              }}
              itemStyle={{ fontFamily: 'IBM Plex Mono', color: tickColor, fontWeight: 500 }}
              labelStyle={{ color: tickColor, marginBottom: '6px' }}
              formatter={(val: number | string | readonly (string | number)[] | undefined) => formatCurrency(Number(val))}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: '12px' }}
              formatter={(val) => (
                <span style={{ fontSize: 13, color: tickColor }}>{val}</span>
              )}
            />
            <Bar dataKey="Income" fill="rgb(52,211,153)" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="Expense" fill="rgb(var(--color-primary))" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </InsightCard>
  );
}
