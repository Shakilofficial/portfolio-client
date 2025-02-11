import { Skeleton } from "../ui/skeleton";

const GridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
    ))}
  </div>
);

export default GridSkeleton;
