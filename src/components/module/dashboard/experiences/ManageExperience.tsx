/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import DTable from "@/components/core/DTable";
import Pagination from "@/components/core/Pagination";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteExperience } from "@/services/experienceService";
import type { IExperience, IMeta } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CreateExperienceDialog from "./CreateExperienceDialog";
import UpdateExperienceDialog from "./UpdateExperienceDialog";

interface ManageExperienceProps {
  experiences: IExperience[];
  meta: IMeta;
}

const ManageExperience = ({ experiences, meta }: ManageExperienceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<IExperience | null>(null);

  const handleDelete = (experience: IExperience) => {
    setSelectedExperience(experience);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedExperience?._id) {
        const res = await deleteExperience(selectedExperience._id);
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete experience");
    } finally {
      setIsOpen(false);
      setSelectedExperience(null);
    }
  };

  const formatDate = (dateString: string | Date | undefined | null) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const columns = [
    {
      accessorKey: "title",
      header: () => <div className="text-left">Title</div>,
      cell: ({ row }: { row: { original: IExperience } }) => (
        <div className="max-w-xs">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {row.original.position}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "company",
      header: () => <div className="text-left">Company</div>,
      cell: ({ row }: { row: { original: IExperience } }) => (
        <div className="max-w-xs">
          <div className="font-medium">{row.original.company}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {row.original.location}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: () => <div className="text-left">Duration</div>,
      cell: ({ row }: { row: { original: IExperience } }) => (
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>
            {formatDate(row.original.startDate)} -{" "}
            {formatDate(row.original.endDate)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-left">Created</div>,
      cell: ({ row }: { row: { original: IExperience } }) => (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(row.original.createdAt)}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: { original: IExperience } }) => (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <UpdateExperienceDialog experience={row.original} />
              </TooltipTrigger>
              <TooltipContent>Edit experience</TooltipContent>
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
              <TooltipContent>Delete Experience</TooltipContent>
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
          Manage Experiences
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <CreateExperienceDialog />
        </div>
      </div>

      <DTable columns={columns} data={experiences} />

      <Pagination totalPage={meta?.totalPage} />

      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Experience"
        description={`Are you sure you want to delete ${selectedExperience?.title} experience? This action cannot be undone.`}
        confirmButtonText="Delete"
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
};

export default ManageExperience;
