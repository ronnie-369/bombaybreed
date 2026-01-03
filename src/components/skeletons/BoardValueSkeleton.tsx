import { Skeleton } from '@/components/ui/skeleton';

const BoardValueSkeleton = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Skeleton className="h-4 w-32 mx-auto mb-3" />
          <Skeleton className="h-9 w-72 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-8 rounded-lg bg-card border border-border/50"
            >
              <div className="flex items-start gap-5">
                <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-48" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardValueSkeleton;
