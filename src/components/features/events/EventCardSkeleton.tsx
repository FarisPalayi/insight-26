import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden border-none">
      <div className="flex flex-col lg:flex-row">
        <Skeleton className="w-full lg:w-1/2 aspect-[16/10] lg:min-h-[300px]" />
        <CardContent className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <Skeleton className="hidden sm:block h-10 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </div>
          <Skeleton className="h-8 w-1/2" />
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 flex-1 sm:w-32" />
            <Skeleton className="h-10 flex-1 sm:w-36" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
