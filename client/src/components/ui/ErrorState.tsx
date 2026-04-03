import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center">
        <AlertTriangle size={28} className="text-danger" />
      </div>
      <div className="space-y-1">
        <p className="font-heading font-semibold text-on-surface text-lg">Error Loading Data</p>
        <p className="text-sm text-on-surface-variant max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}
