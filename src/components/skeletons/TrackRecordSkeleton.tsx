import { Skeleton } from '@/components/ui/skeleton';

const TrackRecordSkeleton = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Skeleton className="h-4 w-24 mx-auto mb-3" />
          <Skeleton className="h-9 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 max-w-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Professional Summary */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />
            
            <div className="space-y-0">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between items-center py-4 border-b border-border/50">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>

          {/* Board-Relevant Experience */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-52" />
            
            <div className="space-y-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Skeleton className="h-4 w-4 shrink-0 mt-0.5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="p-8 bg-card rounded-lg border border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <Skeleton className="h-6 w-56 mx-auto md:mx-0 mb-2" />
              <Skeleton className="h-4 w-72 mx-auto md:mx-0" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecordSkeleton;
