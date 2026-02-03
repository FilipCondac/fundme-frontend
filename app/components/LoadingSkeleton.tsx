import { memo } from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = memo<SkeletonProps>(({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    aria-live="polite"
    aria-busy="true"
  />
));

Skeleton.displayName = "Skeleton";

interface TextSkeletonProps {
  width?: string;
}

export const TextSkeleton = memo<TextSkeletonProps>(({ width = "100%" }) => (
  <Skeleton className="h-4" style={{ width }} />
));

TextSkeleton.displayName = "TextSkeleton";

export const CardSkeleton = memo(() => (
  <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
));

CardSkeleton.displayName = "CardSkeleton";
