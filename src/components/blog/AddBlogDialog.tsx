/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FileText, Image, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

const AddBlogDialog = () => {
  const [createBlog] = useCreateBlogMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImage: "",
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Adding your blog...");
    try {
      await createBlog(data).unwrap();
      toast.success("Blog added successfully", { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add blog", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 text-purple-600 hover:text-rose-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 transition-all duration-300 px-4 py-2 rounded-lg">
        <Plus className="mr-2 h-4 w-4" /> Add Blog
      </DialogTrigger>

      <DialogContent className="max-w-[380px] md:max-w-screen-sm rounded-lg border border-purple-200 dark:border-purple-800 p-6">
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new blog post.
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form form={form} onSubmit={onSubmit}>
            <div className="space-y-2 md:space-y-6">
              <TextInput
                name="title"
                label="Title"
                icon={FileText}
                placeholder="Blog Title"
                type="text"
              />
              <Textarea
                name="content"
                label="Content"
                icon={FileText}
                placeholder="Blog Content"
              />
              <TextInput
                name="coverImage"
                label="Cover Image URL"
                icon={Image}
                placeholder="URL of cover image"
                type="text"
              />
            </div>
          </Form>
        </motion.div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogDialog;
