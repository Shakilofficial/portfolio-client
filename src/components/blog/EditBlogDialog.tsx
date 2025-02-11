/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { useUpdateBlogMutation } from "@/redux/features/blog/blogApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FileText, Image, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content is required"),
  coverImage: z.string().min(1, "Cover image is required"),
});

type FormValues = z.infer<typeof blogSchema>;

const EditBlogDialog = ({ blog }: { blog: any }) => {
  const [updateBlog] = useUpdateBlogMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog,
  });

  useEffect(() => {
    if (blog) {
      form.reset(blog);
    }
  }, [blog, form]);

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Updating blog?...");
    try {
      await updateBlog({ ...data, _id: blog?._id }).unwrap();
      toast.success("Blog updated successfully", { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update blog", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400">
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="max-w-[380px] md:max-w-screen-sm rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription className="sr-only">Update blog</DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form form={form} onSubmit={onSubmit}>
            <div className="space-y-2 md:space-y-6">
              <TextInput name="title" label="Title" icon={FileText} />
              <Textarea name="content" label="Content" icon={FileText} />
              <TextInput
                name="coverImage"
                label="Cover Image URL"
                icon={Image}
              />
            </div>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogDialog;
