"use client";

import placeholderImage from "@/assets/placeholder.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import type { TBlog } from "@/types/blog.type";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const AdminBlogsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { isFetching, isLoading, data } = useGetAllBlogsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  if (isFetching || isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-purple-700 dark:text-purple-400">
          Blogs
        </h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Add Blog
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20 text-center">
          <CardTitle className="text-xl text-purple-700 dark:text-purple-300">
            Manage All Blogs
          </CardTitle>
          <CardDescription>
            Manage your blog posts. You can edit, delete, or create new posts.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="rounded-md border border-purple-200 dark:border-purple-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-purple-100 dark:bg-purple-900/40">
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((blog: TBlog) => (
                  <TableRow
                    key={blog._id}
                    className="hover:bg-purple-50 dark:hover:bg-purple-900/10"
                  >
                    <TableCell>
                      <div className="relative h-12 w-20">
                        <Image
                          src={blog.coverImage || placeholderImage}
                          alt={blog.title}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 768px) 100px, (max-width: 1200px) 120px, 120px"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {blog.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8">
                          <Image
                            src={blog.author.profileImage || "/placeholder.png"}
                            alt={blog.author.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <span>{blog.author.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {blog.isPublished ? (
                        <span className="text-green-600 dark:text-green-400">
                          Published
                        </span>
                      ) : (
                        <span className="text-yellow-600 dark:text-yellow-400">
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {blog.isFeatured ? (
                        <span className="text-green-600 dark:text-green-400">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-purple-600 dark:hover:text-purple-400"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-600 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {data?.meta && (
            <div className="mt-4">
              <Pagination
                currentPage={page}
                totalPages={data.meta.totalPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogsPage;
