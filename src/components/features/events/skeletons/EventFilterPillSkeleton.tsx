import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface EventCategoryFilterSkeletonProps {
  showLabel?: boolean;
  className?: string;
}

const PILL_WIDTHS = [
  "w-24",
  "w-28",
  "w-24",
  "w-32",
  "w-26",
];

export function EventCategoryFilterSkeleton({
  showLabel = false,
  className,
}: EventCategoryFilterSkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Optional label */}
      {showLabel && (
        <div className="sm:text-center mb-3 md:mb-4 flex justify-center">
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      )}

      {/* Pills container – matches real layout */}
      <div className="flex sm:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 md:flex-wrap scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {PILL_WIDTHS.map((width, i) => (
          <Skeleton
            key={i}
            className={cn(
              "rounded-full h-8 md:h-9 shrink-0",
              width,
              // very subtle emphasis for the first pill
              i === 0 && "opacity-80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
