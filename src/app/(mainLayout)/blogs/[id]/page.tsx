"use client";
import placeholderImage from "@/assets/placeholder.jpg";
import DetailsSkeleton from "@/components/feedback/DetailsSkeleton";
import Error from "@/components/feedback/Error";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const {
    isFetching,
    isLoading,
    isError,
    data: blog,
    error,
  } = useGetSingleBlogQuery(id as string);

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
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      {/* Blog Title */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          <AuroraText>{blog?.title}</AuroraText>
        </h1>
        <div className="flex items-center text-muted-foreground space-x-6 mb-6">
          <span className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-3" />
            {new Date(blog?.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center text-gray-600">
            <Image
              src={blog?.author?.profileImage}
              alt={blog?.author?.name}
              width={30}
              height={30}
              className="rounded-full mr-2"
            />
            {blog?.author?.name}
          </span>
        </div>
      </div>

      {/* Blog Image */}
      <Card className="mb-12 shadow-lg rounded-lg overflow-hidden">
        <Image
          src={blog?.coverImage || placeholderImage}
          alt={blog?.title}
          width={800}
          height={400}
          className="object-cover rounded-lg w-full h-auto"
          priority
        />
      </Card>

      {/* Blog Content */}
      <CardContent className="prose prose-indigo dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
      </CardContent>
    </div>
  );
};

export default BlogDetailsPage;
