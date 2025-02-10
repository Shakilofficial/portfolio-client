"use client";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useGetSingleBlogQuery(id as string);

  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  if (error) {
    return <div>Error loading blog details.</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      {/* Blog Title */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          <AuroraText>{blog.title}</AuroraText>
        </h1>
        <div className="flex items-center text-muted-foreground space-x-6 mb-6">
          <span className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-3" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center text-gray-600">
            <Image
              src={blog.author.profileImage}
              alt={blog.author.name}
              width={30}
              height={30}
              className="rounded-full mr-2"
            />
            {blog.author.name}
          </span>
        </div>
      </div>

      {/* Blog Image */}
      <Card className="mb-12 shadow-lg rounded-lg overflow-hidden">
        <Image
          src={blog.coverImage || "/placeholder-blog.svg"}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </Card>

      {/* Blog Content */}
      <CardContent className="prose prose-indigo dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </CardContent>
    </div>
  );
};

const BlogDetailsSkeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
    <Skeleton className="h-12 w-3/4 mb-6" />
    <Skeleton className="h-6 w-1/2 mb-6" />
    <div className="flex space-x-6 mb-6">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-32" />
    </div>
    <Skeleton className="h-[400px] w-full mb-12" />
    <Skeleton className="h-6 w-full mb-2" />
    <Skeleton className="h-6 w-full mb-2" />
    <Skeleton className="h-6 w-3/4 mb-2" />
  </div>
);

export default BlogDetailsPage;
