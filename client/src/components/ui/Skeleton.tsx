export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-surface-variant rounded ${className}`}></div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center space-x-4 py-4 w-full">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className={`flex-1`}>
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
