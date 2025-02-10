"use client";
import BlogCard from "@/components/blog/BlogCard";
import BlogFilter from "@/components/blog/BlogFilter";
import { useBlogFilters } from "@/components/blog/useBlogFilters";
import { AuroraText } from "@/components/magicui/aurora-text";
import Pagination from "@/components/project/Pagination";

import { Skeleton } from "@/components/ui/skeleton";

import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { motion } from "framer-motion";

const BlogsPage = () => {
  const {
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    limit,
    getQueryParams,
  } = useBlogFilters();

  const { data, error, isLoading } = useGetAllBlogsQuery(getQueryParams());

  const BlogsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(limit)].map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full" />
      ))}
    </div>
  );

  return (
    <div className="w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12 my-16">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          <AuroraText>Blog Posts</AuroraText>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore my thoughts, tutorials, and insights on various topics.
        </p>
      </motion.div>

      <BlogFilter sortBy={sortBy} onSortChange={setSortBy} />

      {isLoading ? (
        <BlogsSkeleton />
      ) : error ? (
        <div>Error loading blog posts.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {data?.data?.length === 0 && <div>No blog posts found.</div>}
          <Pagination
            currentPage={currentPage}
            totalPages={data?.meta?.totalPage || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BlogsPage;
