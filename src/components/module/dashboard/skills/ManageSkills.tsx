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
import { deleteSkill } from "@/services/skillService";
import { IMeta, ISkill } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateSkillDialog from "./CreateSkillDialog";
import UpdateSkillDialog from "./UpdateSkillDialog";

interface ManageSkillsProps {
  skills: ISkill[];
  meta: IMeta;
}

const ManageSkills = ({ skills, meta }: ManageSkillsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ISkill) => {
    setSelectedId(data._id);
    setSelectedItem(data.name);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSkill(selectedId);
        if (res.success) {
          toast.success(res.message);
          setIsOpen(false);
          setSelectedId(null);
          setSelectedItem(null);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
      toast.error("Failed to delete skill");
    }
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      Language:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      Frontend:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      Backend:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      DevOps: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      Tools:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    };

    return (
      categories[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
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
      accessorKey: "icon",
      header: () => <div className="text-left">Icon</div>,
      cell: ({ row }: { row: any }) => (
        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted/50">
          <Image
            src={row.original.icon || "/skill-placeholder.svg"}
            alt={row.original.name}
            fill
            className="object-contain p-1.5"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      cell: ({ row }: { row: any }) => (
        <div className="max-w-xs">
          <div className="font-medium text-foreground truncate">
            {row.original.name}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(row.original.createdAt)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-left">Category</div>,
      cell: ({ row }: { row: any }) => (
        <Badge
          variant="secondary"
          className={`text-sm ${getCategoryColor(row.original.category)}`}
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <UpdateSkillDialog skill={row.original} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit skill</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                  onClick={() => handleDelete(row.original)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete skill</p>
              </TooltipContent>
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
          Manage Skills
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <CreateSkillDialog />
        </div>
      </div>

      <DTable columns={columns} data={skills} />

      <Pagination totalPage={meta?.totalPage} />

      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Skill"
        description={`Are you sure you want to delete ${selectedItem} skill? This action cannot be undone.`}
        confirmButtonText="Delete"
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
};

export default ManageSkills;
