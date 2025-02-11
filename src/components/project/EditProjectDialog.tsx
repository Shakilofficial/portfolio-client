/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { useUpdateProjectMutation } from "@/redux/features/project/projectApi";
import { CATEGORY_OPTIONS, categoryOptions } from "@/types/project.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FileText, Image, Link, Pencil, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// Zod Schema for Validation
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(10, "Description is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  category: z.enum(CATEGORY_OPTIONS),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

// Type for form values
type FormValues = z.infer<typeof projectSchema>;

const EditProjectDialog = ({ project }: { project: any }) => {
  const [updateProject] = useUpdateProjectMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project,
  });

  useEffect(() => {
    if (project) {
      form.reset(project);
    }
  }, [project, form]);

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Updating project...");
    try {
      await updateProject({ ...data, _id: project._id }).unwrap();
      toast.success("Project updated successfully", { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update project", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400">
        <Pencil className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="max-w-[380px] md:max-w-screen-sm rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form form={form} onSubmit={onSubmit}>
            <div className="space-y-2 md:space-y-6">
              <TextInput name="title" label="Title" icon={FileText} />
              <TextInput name="subtitle" label="Subtitle" icon={Tag} />
              <Textarea
                name="description"
                label="Description"
                icon={FileText}
              />
              <TextInput
                name="coverImage"
                label="Cover Image URL"
                icon={Image}
              />
              <TextInput name="githubUrl" label="GitHub URL" icon={Link} />
              <TextInput name="liveUrl" label="Live URL" icon={Link} />
              <SelectDropdown
                name="category"
                label="Category"
                options={categoryOptions}
              />
            </div>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
