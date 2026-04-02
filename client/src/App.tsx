import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import { ToastContainer } from './components/ui/Toast';
import { Skeleton } from './components/ui/Skeleton';

/**
 * React.lazy: splits each feature page into its own chunk.
 * Per AGENT.md §14 — lazy load feature pages via React.lazy + Suspense.
 * Reduces initial bundle and improves first-paint on slower connections.
 */
const DashboardPage = lazy(() => import('./features/dashboard'));
const TransactionsPage = lazy(() => import('./features/transactions'));
const InsightsPage = lazy(() => import('./features/insights'));

function PageLoader() {
  return (
    <div className="space-y-6 p-2">
      <Skeleton className="w-48 h-8 rounded-lg" />
      <Skeleton className="w-72 h-4 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <Skeleton className="w-full h-72 rounded-xl" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </AppShell>
    </Router>
  );
}
