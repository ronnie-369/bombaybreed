import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ServicesHubSkeleton = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-[32rem] max-w-full mx-auto" />
        </div>

        {/* Core Capabilities */}
        <div className="mb-12">
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Who We Work With & Browse by Region */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Who We Work With */}
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <Skeleton className="h-4 w-36 mb-4" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-3">
                  <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                      <Skeleton className="h-5 w-18 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-4 w-32 mt-4" />
          </div>

          {/* Geographies */}
          <div className="p-6 rounded-xl bg-card border border-border/50">
            <Skeleton className="h-4 w-28 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-20 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-28 mt-4" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Skeleton className="h-11 w-44 mx-auto rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default ServicesHubSkeleton;