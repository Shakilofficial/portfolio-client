/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import DTable from "@/components/core/DTable";
import Pagination from "@/components/core/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlogCategory } from "@/constants/blogCategory";
import {
  deleteBlog,
  toggledFeaturedBlog,
  toggledPublishBlog,
} from "@/services/blogService";
import { IBlog, IMeta } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Eye, EyeOff, Star, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateBlogDialog from "./CreateBlogDialog";
import UpdateBlogDialog from "./UpdateBlogDialog";

interface ManageBlogsProps {
  blogs: IBlog[];
  meta: IMeta;
}

const ManageBlogs = ({ blogs, meta }: ManageBlogsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const handleDelete = (blog: IBlog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedBlog?._id) {
        const res = await deleteBlog(selectedBlog._id);
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete blog");
    } finally {
      setIsOpen(false);
      setSelectedBlog(null);
    }
  };

  const handlePublishToggle = async (id: string) => {
    try {
      const res = await toggledPublishBlog(id);
      if (res.success) {
        toast.success("Publication status updated");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleFeatureToggle = async (id: string) => {
    try {
      const res = await toggledFeaturedBlog(id);
      if (res.success) {
        toast.success("Feature status updated");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCategoryColor = (category: BlogCategory) => {
    const categories: Record<BlogCategory, string> = {
      [BlogCategory.WebDevelopment]:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30",
      [BlogCategory.FrontendDevelopment]:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30",
      [BlogCategory.BackendDevelopment]:
        "bg-green-100 text-green-800 dark:bg-green-900/30",
      [BlogCategory.ProgrammingTips]:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30",
      [BlogCategory.TechTutorials]:
        "bg-red-100 text-red-800 dark:bg-red-900/30",
      [BlogCategory.CareerDevelopment]:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30",
      [BlogCategory.ProjectShowcases]:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30",
      [BlogCategory.ToolsAndResources]:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30",
      [BlogCategory.DevOpsAndDeployment]:
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30",
      [BlogCategory.IndustryNews]:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30",
    };
    return categories[category];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      accessorKey: "thumbnail",
      header: () => <div className="text-left">Thumbnail</div>,
      cell: ({ row }: { row: { original: IBlog } }) => (
        <div className="relative h-12 w-20 overflow-hidden rounded-md border border-border">
          <Image
            src={row.original.thumbnail || "/blog-placeholder.jpg"}
            alt={row.original.title}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => <div className="text-left">Title</div>,
      cell: ({ row }: { row: { original: IBlog } }) => (
        <div className="max-w-xs">
          <div className="font-medium truncate">{row.original.title}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(row.original.createdAt.toString())}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-left">Category</div>,
      cell: ({ row }: { row: { original: IBlog } }) => (
        <Badge
          className={getCategoryColor(row.original.category as BlogCategory)}
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }: { row: { original: IBlog } }) => (
        <div className="flex gap-2">
          <Badge
            className={`${
              row.original.isPublished
                ? "bg-green-100 text-green-800 dark:bg-green-900/30"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30"
            }`}
          >
            {row.original.isPublished ? "Published" : "Draft"}
          </Badge>

          {row.original.isFeatured && (
            <Badge
              className={`${
                row.original.isFeatured
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30"
              }`}
            >
              {row.original.isFeatured ? "Featured" : "Not Featured"}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: { original: IBlog } }) => (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <UpdateBlogDialog blog={row.original} />
              </TooltipTrigger>
              <TooltipContent>Edit blog</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFeatureToggle(row.original._id)}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {row.original.isFeatured ? "Unfeature" : "Mark as featured"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePublishToggle(row.original._id)}
                >
                  {row.original.isPublished ? <EyeOff /> : <Eye />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {row.original.isPublished ? "Unpublish" : "Publish"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(row.original)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete blog</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
          Manage Blogs
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <CreateBlogDialog />
        </div>
      </div>

      <DTable columns={columns} data={blogs} />

      <Pagination totalPage={meta?.totalPage} />

      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Blog"
        description={`Are you sure you want to delete ${selectedBlog?.title} blog? This action cannot be undone.`}
        confirmButtonText="Delete"
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
};

export default ManageBlogs;
