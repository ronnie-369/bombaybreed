import { Skeleton } from '@/components/ui/skeleton';

const HeroSkeleton = () => {
  return (
    <section className="pt-28 md:pt-36 lg:pt-40 pb-20 md:pb-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-5">
              <Skeleton className="h-4 w-48 mx-auto lg:mx-0" />
              <Skeleton className="h-12 w-64 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-80 mx-auto lg:mx-0" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2 max-w-lg mx-auto lg:mx-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-4 w-72 mx-auto lg:mx-0" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Skeleton className="h-11 w-44" />
              <Skeleton className="h-11 w-40" />
            </div>
          </div>

          {/* Right Column - Portrait */}
          <div className="relative order-first lg:order-last">
            <div className="relative bg-muted rounded-lg overflow-hidden">
              <Skeleton className="aspect-[4/5] w-full" />
            </div>
            
            {/* Quote Card Skeleton */}
            <div className="absolute -bottom-4 -left-4 bg-card p-5 rounded-lg shadow-sm border border-border max-w-xs">
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
