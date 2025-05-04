import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const DetailsSkeleton = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[100px]"
          style={{
            animation: "float 15s ease-in-out infinite alternate",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-[100px]"
          style={{
            animation: "float 20s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      <div className="max-w-[1400px] w-full mx-auto py-28 px-4 md:px-6 lg:px-8 flex flex-col gap-12">
        <div className="mb-8">
          <div className="mb-4">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm">
              <Skeleton className="h-4 w-20" />
            </Badge>
          </div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mb-6" />
          <div className="flex flex-wrap gap-4 mb-8">
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </div>

        <Card className="overflow-hidden border border-white/10 backdrop-blur-sm shadow-xl rounded-xl">
          <Skeleton className="w-full h-[400px] md:h-[500px]" />
        </Card>

        <div className="mb-10">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>

        <Card className="border border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <Skeleton className="h-10 w-64 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
