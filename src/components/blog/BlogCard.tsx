/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TBlog } from "@/types/blog.type";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900/30 rounded-lg">
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={blog?.thumbnail || "/placeholder.svg"}
          alt={blog?.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-600/90 text-white text-xs font-medium px-2 py-1">
            {blog?.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {blog?.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {blog?.subtitle}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-purple-500" />
            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <span className="flex items-center">
            {blog?.createdBy?.profileImage && (
              <Image
                src={blog.createdBy.profileImage || "/placeholder.svg"}
                alt={blog.createdBy.name}
                width={20}
                height={20}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-xs">{blog?.createdBy?.name}</span>
          </span>
        </div>

        <Button
          asChild
          variant="ghost"
          className="w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/30 group-hover:translate-x-2 transition-all duration-300 mt-4 px-4"
        >
          <Link href={`/blogs/${blog?.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
