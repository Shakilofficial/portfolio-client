"use client";
import DetailsSkeleton from "@/components/feedback/DetailsSkeleton";
import Error from "@/components/feedback/Error";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const {
    isFetching,
    isLoading,
    isError,
    data: blog,
    error,
  } = useGetSingleBlogQuery(slug as string);

  if (isFetching || isLoading) {
    return <DetailsSkeleton />;
  }

  if (isError || error) {
    return <Error message="Error loading blog details" />;
  }

  if (!blog) {
    return <Error message="Blog not found" />;
  }
  console.log(blog);
  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] w-full mx-auto px-4 py-12 lg:py-20 mt-12 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Blog Category */}
          <div className="mb-4">
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1 text-sm">
              <Tag className="w-4 h-4 mr-1" />
              {blog?.category}
            </Badge>
          </div>

          {/* Blog Title */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            <AuroraText>{blog?.title}</AuroraText>
          </h1>

          {/* Blog Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {blog?.subtitle}
          </p>

          {/* Author and Date */}
          <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              {blog?.createdBy?.profileImage && (
                <Image
                  src={blog.createdBy.profileImage || "/placeholder.svg"}
                  alt={blog.createdBy.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3 border-2 border-purple-200 dark:border-purple-800"
                />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {blog?.createdBy?.name}
                </p>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-1 text-purple-500" />
                  {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-0 shadow-xl rounded-xl">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
              <Image
                src={blog?.thumbnail || "/placeholder.svg"}
                alt={blog?.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-0 backdrop-blur-sm">
            <CardContent className="p-6 md:p-10">
              <div
                className="prose prose-lg prose-purple dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
