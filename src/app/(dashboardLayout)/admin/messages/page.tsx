"use client";

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
  useDeleteMessageMutation,
  useGetAllMessageQuery,
} from "@/redux/features/message/messageApi";
import type { TMessage } from "@/types/message.type";
import { format } from "date-fns";
import { Loader2, Mail, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminMessagesPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { isFetching, isLoading, data } = useGetAllMessageQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  const [deleteMessage] = useDeleteMessageMutation();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<TMessage | null>(null);

  if (isFetching || isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const handleDeleteBlog = (messageId: string) => {
    setMessageToDelete(
      data?.data?.find((message) => message._id === messageId) || null
    );
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (messageToDelete) {
      await deleteMessage(messageToDelete._id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-purple-700 dark:text-purple-400">
          Messages
        </h2>
        <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 rounded-md px-4 py-1">
          <span className="font-semibold text-muted-foreground">
            Total: {data?.meta?.total || 0}
          </span>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20 text-center">
          <CardTitle className="text-xl text-purple-700 dark:text-purple-300">
            Manage Users Message
          </CardTitle>
          <CardDescription>
            View and manage messages from users.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="rounded-md border border-purple-200 dark:border-purple-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-purple-100 dark:bg-purple-900/40">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((message: TMessage) => (
                  <TableRow
                    key={message._id}
                    className="hover:bg-purple-50 dark:hover:bg-purple-900/10"
                  >
                    <TableCell className="font-medium">
                      {message.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-500" />
                        {message.email}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {message.message}
                    </TableCell>
                    <TableCell>
                      {format(new Date(message.createdAt), "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-red-600 dark:hover:text-red-400"
                        onClick={() => handleDeleteBlog(message._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
              Are you sure you want to delete this message?
            </DialogTitle>
            <DialogDescription>
              Deleting this message will permanently remove it from your
              messages.
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

export default AdminMessagesPage;
