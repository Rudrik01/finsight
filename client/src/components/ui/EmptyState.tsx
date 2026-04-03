import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({
  title = 'Nothing here yet',
  message = 'No data matches your current filters.',
  ctaLabel,
  onCta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-surface-variant/30 flex items-center justify-center">
        <Inbox size={28} className="text-on-surface-variant" />
      </div>
      <div className="space-y-1">
        <p className="font-heading font-semibold text-on-surface text-lg">{title}</p>
        <p className="text-sm text-on-surface-variant max-w-xs">{message}</p>
      </div>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
