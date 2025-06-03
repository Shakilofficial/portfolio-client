"use client";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import type { TQueryParam } from "@/types/global";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Hash,
  MessageCircle,
  MessageSquare,
  Quote,
} from "lucide-react";
import Link from "next/link";

import BlogCard from "./blog/BlogCard";
import Error from "./feedback/Error";
import GridSkeleton from "./feedback/GridSkeleton";
import { AuroraText } from "./magicui/aurora-text";
import { ShinyButton } from "./magicui/shiny-button";

const LatestBlogs = () => {
  const queryParams: TQueryParam[] = [
    { name: "isPublished", value: true },
    { name: "sortBy", value: "createdAt" },
    { name: "sortOrder", value: "desc" },
    { name: "limit", value: 4 },
  ];

  const { isFetching, isLoading, isError, data, error } =
    useGetAllBlogsQuery(queryParams);

  if (isFetching || isLoading) {
    return <GridSkeleton />;
  }

  if (isError || error || !data?.data) {
    return <Error message="No blogs found" />;
  }

  // Generate random positions for speech bubbles and text elements
  const generateRandomElements = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      rotation: Math.random() * 30 - 15,
      type: index % 6, // 0: message, 1: quote, 2: book, 3: file, 4: hash, 5: message-square
      opacity: Math.random() * 0.15 + 0.05,
    }));
  };

  const elements = generateRandomElements(12);

  // Generate random text snippets for the background
  const textSnippets = [
    "const BlogPost = () => { ... }",
    "function readTime(content) { ... }",
    "export default Blog",
    "<article>...</article>",
    "# Markdown Heading",
    "![Image Alt](url)",
    "```jsx",
    "npm install",
    "git commit",
    "yarn dev",
    "// TODO: Add comments",
    "/* CSS styles */",
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Text pattern background */}
      <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
        {textSnippets.map((snippet, index) => (
          <div
            key={index}
            className="absolute font-mono text-xs text-indigo-800 dark:text-indigo-200 whitespace-nowrap"
            style={{
              left: `${(index * 17) % 100}%`,
              top: `${(index * 23) % 100}%`,
              transform: `rotate(${((index * 7) % 90) - 45}deg)`,
              opacity: 0.3 + (index % 7) * 0.1,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Communication icons */}
      <div className="absolute inset-0 overflow-hidden">
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute transform transition-transform duration-[15000ms] ease-in-out"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation}deg)`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              animation: `float-blog-${element.id % 3} ${
                15 + (element.id % 10)
              }s infinite ease-in-out`,
            }}
          >
            {element.type === 0 && (
              <MessageCircle className="w-full h-full text-blue-500" />
            )}
            {element.type === 1 && (
              <Quote className="w-full h-full text-purple-500" />
            )}
            {element.type === 2 && (
              <BookOpen className="w-full h-full text-indigo-500" />
            )}
            {element.type === 3 && (
              <FileText className="w-full h-full text-violet-500" />
            )}
            {element.type === 4 && (
              <Hash className="w-full h-full text-fuchsia-500" />
            )}
            {element.type === 5 && (
              <MessageSquare className="w-full h-full text-pink-500" />
            )}
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-xl opacity-10 dark:opacity-[0.07] blur-3xl bg-gradient-to-br from-blue-500 to-indigo-500" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-xl opacity-10 dark:opacity-[0.07] blur-3xl bg-gradient-to-br from-purple-500 to-pink-500" />

      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto px-4 py-12 lg:py-20 flex flex-col gap-12 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              My Blogs
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <AuroraText>Latest Blog Posts</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Read my latest blog posts and stay up to date with my latest
            projects.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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

      {/* CSS for floating animations */}
      <style jsx global>{`
        @keyframes float-blog-0 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        @keyframes float-blog-1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(15px) rotate(-3deg);
          }
        }
        @keyframes float-blog-2 {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(15px) rotate(3deg);
          }
        }
      `}</style>
    </section>
  );
};

export default LatestBlogs;
