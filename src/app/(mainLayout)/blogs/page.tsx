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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          <AuroraText>All Blogs</AuroraText>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore my thoughts, tutorials, and insights on various topics.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
