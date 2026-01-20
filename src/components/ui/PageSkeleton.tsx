import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Lightweight skeleton UI for route transitions during lazy loading.
 * Designed to be minimal and fast-rendering.
 */
const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      
      {/* Hero section skeleton */}
      <div className="pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6 text-center">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <div className="flex gap-4 justify-center pt-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section skeleton */}
      <div className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-6 space-y-4">
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
