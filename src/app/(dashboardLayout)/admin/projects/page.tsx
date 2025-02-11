"use client";

import AddProjectDialog from "@/components/project/AddProjectDialog";
import EditProjectDialog from "@/components/project/EditProjectDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "@/redux/features/project/projectApi";
import type { TProject } from "@/types/project.type";
import { format } from "date-fns";
import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

const AdminProjectsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { isFetching, isLoading, data } = useGetAllProjectsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  const [deleteProject] = useDeleteProjectMutation();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<TProject | null>(null);

  if (isFetching || isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(
      data?.data?.find((project) => project._id === projectId) || null
    );
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete._id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-purple-700 dark:text-purple-400">
          Projects
        </h2>
        <AddProjectDialog />
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20 text-center">
          <CardTitle className="text-xl text-purple-700 dark:text-purple-300">
            Manage All Projects
          </CardTitle>
          <CardDescription>
            Manage your projects. You can edit, delete, or add new projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="rounded-md border border-purple-200 dark:border-purple-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-purple-100 dark:bg-purple-900/40">
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((project: TProject) => (
                  <TableRow
                    key={project._id}
                    className="hover:bg-purple-50 dark:hover:bg-purple-900/10"
                  >
                    <TableCell>
                      <div className="relative h-12 w-20">
                        <Image
                          src={project.coverImage || "/placeholder.png"}
                          alt={project.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {project.title}
                    </TableCell>
                    <TableCell className="capitalize">
                      {project.category}
                    </TableCell>
                    <TableCell>
                      {project.isFeatured ? (
                        <span className="text-green-600 dark:text-green-400">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(project.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <FaGithub className="h-4 w-4" />
                        </Link>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <EditProjectDialog project={project} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-red-600 dark:hover:text-red-400"
                          onClick={() => handleDeleteProject(project._id)}
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger />
        <DialogContent className="max-w-[380px] rounded-lg border border-purple-200 dark:border-purple-800 p-6">
          <DialogHeader className="mt-4">
            <DialogTitle>
              Are you sure you want to delete this project?
            </DialogTitle>
            <DialogDescription>
              Deleting this project will permanently remove it from your
              portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjectsPage;
