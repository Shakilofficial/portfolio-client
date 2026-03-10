"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TBlog } from "@/types/blog.type";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: TBlog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formattedDate = new Date(blog?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blogs/${blog?.slug}`} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full"
      >
        <Card className="h-full group overflow-hidden border border-purple-100/50 dark:border-purple-900/20 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:border-purple-500/30 transition-all duration-500 rounded-3xl">
          {/* Card Media Wrapper */}
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={blog?.thumbnail || "/placeholder.svg"}
              alt={blog?.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Floating Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <Badge className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-purple-600 dark:text-purple-400 text-[10px] font-black px-3 py-1 border-0 uppercase tracking-widest rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105">
                {blog?.category}
              </Badge>
            </div>

            {/* Floating Date Badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <div className="flex items-center gap-2 text-white/90 text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-6 md:p-8 flex flex-col h-[calc(100%-14rem)]">
            <div className="flex-grow space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-[1.3] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 font-serif">
                {blog?.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-medium">
                {blog?.subtitle}
              </p>
            </div>

            {/* Author and Action Section */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-200 dark:border-purple-800 flex-shrink-0 relative bg-slate-100 dark:bg-slate-800">
                  {blog?.createdBy?.profileImage ? (
                    <Image
                      src={blog.createdBy.profileImage}
                      alt={blog.createdBy.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {blog?.createdBy?.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
