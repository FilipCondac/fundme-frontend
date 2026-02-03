interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    aria-live="polite"
    aria-busy="true"
  />
);

export const TextSkeleton = ({ width = "100%" }: { width?: string }) => (
  <Skeleton className="h-4" style={{ width }} />
);

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);
