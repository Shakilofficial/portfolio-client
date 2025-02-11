import placeholderImage from "@/assets/placeholder.jpg";
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
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-[#252525] dark:border-0 border border-gray-200 rounded-md dark:text-white text-black">
      <div className="relative w-full h-80 overflow-hidden">
        <Image
          src={blog?.coverImage || placeholderImage}
          alt={blog?.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          loading="eager"
          className="absolute -bottom-1 group-hover:-bottom-5 right-0 h-full w-full group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover transition-all duration-300"
        />
        <div
          style={{
            background:
              "linear-gradient(123.9deg, #7e22ce 1.52%, rgba(0, 0, 0, 0) 68.91%)",
          }}
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 transition-all duration-300"
        ></div>
      </div>

      <CardContent className="p-4 space-y-4">
        <h3 className="text-xl font-semibold capitalize text-purple-700 dark:text-purple-300 mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
          {blog?.title}
        </h3>
        <p className="text-base text-purple-600 dark:text-purple-400 line-clamp-3 mb-4 group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors duration-300">
          {blog?.content.substring(0, 150)}...
        </p>
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(blog?.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <Image
              src={blog?.author.profileImage}
              alt={blog?.author.name}
              width={20}
              height={20}
              className="rounded-full mr-2"
            />
            {blog?.author.name}
          </span>
        </div>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-between text-purple-600 hover:text-rose-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 group-hover:translate-x-2 transition-all duration-300"
        >
          <Link href={`/blogs/${blog?._id}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
