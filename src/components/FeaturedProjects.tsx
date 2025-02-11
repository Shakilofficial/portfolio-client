"use client";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";
import { TQueryParam } from "@/types/global";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Error from "./feedback/Error";
import GridSkeleton from "./feedback/GridSkeleton";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";
import FeaturedProjectCard from "./project/FeaturedProjectCard";

const FeaturedProjects = () => {
  const queryParams: TQueryParam[] = [
    { name: "isFeatured", value: true },
    { name: "sortBy", value: "createdAt" },
    { name: "sortOrder", value: "desc" },
    { name: "limit", value: 3 },
  ];

  const { isFetching, isLoading, isError, error, data } =
    useGetAllProjectsQuery(queryParams);

  if (isFetching || isLoading) {
    return <GridSkeleton />;
  }

  if (isError || error || !data?.data) {
    return <Error message="Featured Projects Not Found" />;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3">
            <AuroraText>Featured Projects</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore my highlighted projects showcasing my latest work.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data?.data?.length > 0 ? (
            data?.data?.map((project) => (
              <FeaturedProjectCard key={project?._id} project={project} />
            ))
          ) : (
            <Error message="No featured projects found" />
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={"/projects"}>
            <ShinyButton className="flex items-center gap-2 text-purple-600 hover:text-rose-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 transition-all duration-300 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span>Explore All Projects</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </ShinyButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
