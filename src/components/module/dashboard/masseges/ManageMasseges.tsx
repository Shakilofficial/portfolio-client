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
import { deleteMessage } from "@/services/messageService";
import type { IMessage, IMeta } from "@/types";
import { formatDate } from "@/utils/Dateformater";
import { motion } from "framer-motion";
import { Calendar, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ManageMessagesProps {
  messages: IMessage[];
  meta: IMeta;
}

const ManageMessages = ({ messages, meta }: ManageMessagesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);

  const handleDelete = (message: IMessage) => {
    setSelectedMessage(message);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedMessage?._id) {
        const res = await deleteMessage(selectedMessage._id);
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete message");
    } finally {
      setIsOpen(false);
      setSelectedMessage(null);
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      cell: ({ row }: { row: { original: IMessage } }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }: { row: { original: IMessage } }) => (
        <div className="text-muted-foreground">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "message",
      header: () => <div className="text-left">Message</div>,
      cell: ({ row }: { row: { original: IMessage } }) => (
        <div className="max-w-md truncate">{row.original.message}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-left">Received</div>,
      cell: ({ row }: { row: { original: IMessage } }) => (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(row.original.createdAt)}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: { original: IMessage } }) => (
        <div className="flex justify-end gap-2">
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
              <TooltipContent>Delete Message</TooltipContent>
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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
          Manage Messages
        </h1>
      </div>

      <DTable columns={columns} data={messages} />

      <Pagination totalPage={meta?.totalPage} />

      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Message"
        description={`Are you sure you want to delete this message from ${selectedMessage?.name}? This action cannot be undone.`}
        confirmButtonText="Delete"
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
};

export default ManageMessages;
