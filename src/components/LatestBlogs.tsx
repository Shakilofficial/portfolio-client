"use client";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { TQueryParam } from "@/types/global";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "./blog/BlogCard";
import Error from "./feedback/Error";
import GridSkeleton from "./feedback/GridSkeleton";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";

const LatestBlogs = () => {
  const queryParams: TQueryParam[] = [
    { name: "sortBy", value: "createdAt" },
    { name: "sortOrder", value: "desc" },
    { name: "limit", value: 3 },
  ];

  const { isFetching, isLoading, isError, data, error } =
    useGetAllBlogsQuery(queryParams);

  if (isFetching || isLoading) {
    return <GridSkeleton />;
  }

  if (isError || error || !data?.data) {
    return <Error message="No blogs found" />;
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
            <AuroraText>Latest Blog Posts</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Read my latest blog posts and stay up to date with my latest
            projects.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.length > 0 ? (
            data?.data?.map((blog) => <BlogCard key={blog?._id} blog={blog} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No blogs available.
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={"/blogs"}>
            <ShinyButton className="flex items-center gap-2 text-purple-600 hover:text-rose-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 transition-all duration-300 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span>Explore All Blogs</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </ShinyButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
