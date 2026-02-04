import { Skeleton } from "@/components/ui/skeleton";
import {
  FeaturedEventCardSkeleton,
  EventCardSkeleton,
} from "@/components/features/events/skeletons/EventCardSkeleton";
import Main from "@/components/layout/Main";

export function EventsPageSkeleton() {
  return (
    <Main>
      <div className="relative min-h-screen bg-background">
        {/* HEADER */}
        <div className="relative pt-12 pb-8 px-4">
          <div className="container mx-auto max-w-7xl">

            {/* Title Block */}
            <div className="text-center mb-12 space-y-5">
              <Skeleton className="h-12 w-[360px] max-w-full mx-auto rounded-lg" />
              <Skeleton className="h-6 w-[640px] max-w-full mx-auto rounded-md opacity-70" />
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <Skeleton className="h-12 rounded-xl" />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-9 w-24 rounded-full"
                />
              ))}
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-px opacity-40" />
          </div>
        </div>

        {/* MAIN */}
        <div className="relative py-14 px-4">
          <div className="container mx-auto max-w-7xl space-y-20">

            {/* FEATURED SECTION */}
            <section className="space-y-8">
              {/* Section header */}
              <div className="space-y-2">
                <Skeleton className="h-8 w-56 rounded-md" />
                <Skeleton className="h-4 w-80 rounded-md opacity-70" />
              </div>

              {/* Featured card */}
              <FeaturedEventCardSkeleton />
            </section>

            {/* EVENTS GRID SECTION */}
            <section className="space-y-10">
              {/* Section header */}
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 rounded-md" />
                <Skeleton className="h-4 w-40 rounded-md opacity-70" />
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </Main>
  );
}
