import { Skeleton } from "../ui/skeleton";

const DetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
    <Skeleton className="h-12 w-3/4 mb-4" />
    <Skeleton className="h-6 w-1/2 mb-6" />
    <div className="flex flex-wrap gap-4 mb-6">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="flex flex-wrap gap-2 mb-8">
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-6 w-20" />
      ))}
    </div>
    <Skeleton className="h-[400px] w-full mb-12" />
    <Skeleton className="h-6 w-1/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-12" />
    <div className="flex flex-col sm:flex-row gap-4">
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
    </div>
  </div>
);

export default DetailsSkeleton;
