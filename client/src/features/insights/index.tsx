import { ErrorState } from '@/components/ui/ErrorState';
import { useInsights } from './hooks/useInsights';
import { MonthlyComparisonChart } from './components/MonthlyComparisonChart';
import { TopCategoryCard } from './components/TopCategoryCard';
import { SavingsTrendCard } from './components/SavingsTrendCard';

export default function InsightsPage() {
  const { monthly, categories, isLoading, error, refetch } = useInsights();

  if (error && !isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1">Insights</h1>
          <p className="text-on-surface-variant text-sm">Deep dive into your financial habits.</p>
        </div>
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">Insights</h1>
        <p className="text-on-surface-variant text-sm">Deep dive into your financial habits.</p>
      </div>

      {/* Row 1: Monthly comparison chart (2/3) + MoM card (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MonthlyComparisonChart monthly={monthly} isLoading={isLoading} />
        <SavingsTrendCard monthly={monthly} isLoading={isLoading} />
      </div>

      {/* Row 2: Top categories full width */}
      <TopCategoryCard categories={categories} isLoading={isLoading} />
    </div>
  );
}
