"use client";

import BlogCard from "@/components/blog/BlogCard";
import BlogFilter from "@/components/blog/BlogFilter";
import { useBlogFilters } from "@/components/blog/useBlogFilters";
import Error from "@/components/feedback/Error";
import { AuroraText } from "@/components/magicui/aurora-text";
import Pagination from "@/components/project/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { motion } from "framer-motion";

const BlogsPage = () => {
  const {
    sortBy,
    setSortBy,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    limit,
    getQueryParams,
  } = useBlogFilters();

  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
  } = useGetAllBlogsQuery(getQueryParams());

  const BlogsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(limit)].map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full" />
      ))}
    </div>
  );

  const hasBlogs = Boolean(data?.data?.length ?? 0);

  return (
    <div className="max-w-[1400px] w-full mx-auto py-8 md:py-12 lg:py-28 px-4 md:px-6 lg:px-8 flex flex-col gap-12">
      {/* Background pattern */}
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

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-md mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-heading">
            Discover Insights
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black mb-6 font-serif tracking-wider">
          <AuroraText>Blog & Articles</AuroraText>
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dive into expert tutorials, industry insights, and practical tips that I share to help developers and product enthusiasts stay ahead in technology and innovation.
        </p>
      </motion.div>

      {/* Filter */}
      <BlogFilter
        sortBy={sortBy}
        onSortChange={setSortBy}
        search={search}
        onSearchChange={setSearch}
      />

      {/* Content */}
      {isFetching || isLoading ? (
        <BlogsSkeleton />
      ) : isError || error ? (
        <Error message="Error loading blog posts" />
      ) : (
        <>
          {hasBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data?.data?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <Error message="No blog posts found" />
          )}

          {/* Pagination */}
          {hasBlogs && (
            <Pagination
              currentPage={currentPage}
              totalPages={data?.meta?.totalPage || 1}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BlogsPage;
