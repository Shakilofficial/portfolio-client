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
import {
  deleteProject,
  toggledProjectFeatured,
} from "@/services/projectService";
import { IMeta, IProject } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Star, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateProjectDialog from "./CreateProjectDialog";
import UpdateProjectDialog from "./UpdateProjectDialog";

interface ManageProjectsProps {
  projects: IProject[];
  meta: IMeta;
}

const ManageProjects = ({ projects, meta }: ManageProjectsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const handleDelete = (project: IProject) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedProject?._id) {
        const res = await deleteProject(selectedProject._id);
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete project");
    } finally {
      setIsOpen(false);
      setSelectedProject(null);
    }
  };

  const handleFeatureToggle = async (id: string) => {
    try {
      const res = await toggledProjectFeatured(id);
      if (res.success) {
        toast.success("Feature status updated");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      frontend:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      backend:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      fullstack:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
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
      accessorKey: "coverImage",
      header: () => <div className="text-left">Cover Image</div>,
      cell: ({ row }: { row: { original: IProject } }) => (
        <div className="relative h-12 w-20 overflow-hidden rounded-md border border-border">
          <Image
            src={row.original.coverImage || "/blog-placeholder.jpg"}
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
      cell: ({ row }: { row: { original: IProject } }) => (
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
      cell: ({ row }: { row: { original: IProject } }) => (
        <Badge className={getCategoryColor(row.original.category)}>
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }: { row: { original: IProject } }) => (
        <div className="flex gap-2">
          <Badge
            className={`${
              row.original.isFeatured
                ? "bg-green-100 text-green-800 dark:bg-green-900/30"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30"
            }`}
          >
            {row.original.isFeatured ? "Featured" : "Not Featured"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: { original: IProject } }) => (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <UpdateProjectDialog project={row.original} />
              </TooltipTrigger>
              <TooltipContent>Edit project</TooltipContent>
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
                  onClick={() => handleDelete(row.original)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Project</TooltipContent>
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
          Manage Projects
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <CreateProjectDialog />
        </div>
      </div>

      <DTable columns={columns} data={projects} />

      <Pagination totalPage={meta?.totalPage} />

      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Project"
        description={`Are you sure you want to delete ${selectedProject?.title} project? This action cannot be undone.`}
        confirmButtonText="Delete"
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
};

export default ManageProjects;
