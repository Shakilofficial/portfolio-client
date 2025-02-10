"use client";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";
import { TQueryParam } from "@/types/global";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";
import ProjectCard from "./project/ProjectCard";
import { Skeleton } from "./ui/skeleton";

const FeaturedProjects = () => {
  const queryParams: TQueryParam[] = [
    { name: "isFeatured", value: true },
    { name: "sortBy", value: "createdAt" },
    { name: "sortOrder", value: "desc" },
    { name: "limit", value: 3 },
  ];

  const { data, error, isLoading } = useGetAllProjectsQuery(queryParams);

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (error || !data?.data) {
    return <div className="text-red-500">Error loading projects.</div>;
  }
  console.log(data);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.length > 0 ? (
            data.data.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No featured projects available.
            </p>
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

const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(3)].map((_, index) => (
      <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
    ))}
  </div>
);
