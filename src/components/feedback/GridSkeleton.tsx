import { Skeleton } from "../ui/skeleton";

const GridSkeleton = () => (
  <div className="max-w-[1400px] w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12">
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
    ))}
  </div>
);

export default GridSkeleton;
