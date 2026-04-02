import { useDashboardData } from './hooks/useDashboardData';
import { KpiCardGrid } from './components/KpiCardGrid';
import { KpiCard } from './components/KpiCard';
import { BalanceTrendChart } from './components/BalanceTrendChart';
import { SpendingDonutChart } from './components/SpendingDonutChart';
import { RecentTransactions } from './components/RecentTransactions';

export default function DashboardPage() {
  const { summary, monthly, categories, transactions, isLoading } = useDashboardData();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Dashboard</h1>
        <p className="text-on-surface-variant">Here's your financial summary.</p>
      </div>

      <KpiCardGrid>
        <KpiCard 
          title="Total Balance" 
          amount={summary ? summary.totalBalance : 0} 
          change={summary?.balanceChange || 0} 
          trend={summary && summary.balanceChange >= 0 ? 'up' : 'down'} 
        />
        <KpiCard 
          title="Total Income" 
          amount={summary ? summary.totalIncome : 0} 
          change={summary?.incomeChange || 0} 
          trend={summary && summary.incomeChange >= 0 ? 'up' : 'down'} 
        />
        <KpiCard 
          title="Total Expenses" 
          amount={summary ? summary.totalExpenses : 0} 
          change={summary?.expenseChange || 0} 
          trend={summary && summary.expenseChange >= 0 ? 'down' : 'up'} 
        />
      </KpiCardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BalanceTrendChart data={monthly} isLoading={isLoading} />
        <SpendingDonutChart data={categories} isLoading={isLoading} />
      </div>

      <div className="w-full">
        <RecentTransactions transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
}
