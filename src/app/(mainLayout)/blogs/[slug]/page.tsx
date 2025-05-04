"use client";

import DetailsSkeleton from "@/components/feedback/DetailsSkeleton";
import Error from "@/components/feedback/Error";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

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

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
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

      {/* Back button */}
      <div className="fixed top-24 left-4 z-10 md:left-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black/90"
          >
            <Link href="/blogs" className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto py-28 px-4 md:px-6 lg:px-8 flex flex-col gap-12">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-8 sticky top-0 z-10 pt-8 pb-4 bg-gradient-to-b from-background via-background to-transparent"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blog Category */}
            <div className="mb-4">
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1.5 text-sm">
                <Tag className="w-4 h-4 mr-1" />
                {blog?.category}
              </Badge>
            </div>

            {/* Blog Title */}
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
              <AuroraText>{blog?.title}</AuroraText>
            </h1>

            {/* Blog Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
              {blog?.subtitle}
            </p>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 mb-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                {blog?.createdBy?.profileImage && (
                  <Image
                    src={
                      blog.createdBy.profileImage ||
                      "/placeholder.svg?height=40&width=40"
                    }
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
        </motion.div>

        {/* Blog Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border border-white/10 backdrop-blur-sm shadow-xl rounded-xl group">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src={
                  blog?.thumbnail || "/placeholder.svg?height=500&width=1000"
                }
                alt={blog?.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Card>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <Card className="border border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
            <CardContent className="p-6 md:p-10">
              <div
                className="prose prose-lg prose-purple dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:text-purple-800 dark:prose-headings:text-purple-300 prose-a:text-purple-600 dark:prose-a:text-purple-400"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Related posts or share section could go here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-10"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/blogs" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to all blogs
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
