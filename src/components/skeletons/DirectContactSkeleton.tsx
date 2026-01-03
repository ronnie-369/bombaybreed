import { Skeleton } from '@/components/ui/skeleton';

const DirectContactSkeleton = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Skeleton className="h-4 w-24 mx-auto mb-3" />
          <Skeleton className="h-9 w-80 max-w-full mx-auto mb-4" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-5">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Skeleton className="h-9 w-9 rounded-md shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border/50">
              <div className="p-6 bg-secondary/50 rounded-lg">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>

            <Skeleton className="h-10 w-full" />
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-8 bg-card rounded-lg border border-border/50">
              <Skeleton className="h-6 w-36 mb-6" />
              <div className="space-y-5">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-[120px] w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <Skeleton className="h-4 w-80 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default DirectContactSkeleton;
