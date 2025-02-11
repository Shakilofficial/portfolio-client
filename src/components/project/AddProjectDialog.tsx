/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Form } from "@/components/form/Form";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { useCreateProjectMutation } from "@/redux/features/project/projectApi";
import { CATEGORY_OPTIONS, categoryOptions } from "@/types/project.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FileText, Image, Link, Plus, Tag } from "lucide-react";
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

// Project creation schema validation with Zod
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

// Define form values type based on the schema
type FormValues = z.infer<typeof projectSchema>;

const AddProjectDialog = () => {
  const [createProject] = useCreateProjectMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      coverImage: "",
      category: "frontend",
      githubUrl: "",
      liveUrl: "",
      technologies: [],
      isFeatured: false,
    },
  });

  // Open/Close Dialog state
  const [open, setOpen] = useState(false);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Adding your project...");
    try {
      await createProject({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        coverImage: data.coverImage,
        category: data.category,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        technologies: data.technologies,
        isFeatured: data.isFeatured,
      }).unwrap();
      toast.success("Project added successfully", { id: toastId });
      setOpen(false); // Close the dialog after success
    } catch (error) {
      toast.error("Failed to add project", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 text-purple-600 hover:text-rose-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-rose-400 dark:hover:bg-purple-900/50 transition-all duration-300 px-4 py-2 rounded-lg">
        <Plus className="mr-2 h-4 w-4" /> Add Project
      </DialogTrigger>

      <DialogContent className="max-w-[380px] md:max-w-screen-sm rounded-lg border border-purple-200 dark:border-purple-800 p-6">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new project to your portfolio.
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
                placeholder="Project Title"
                type="text"
              />
              <TextInput
                name="subtitle"
                label="Subtitle"
                icon={Tag}
                placeholder="Project Subtitle"
                type="text"
              />
              <Textarea
                name="description"
                label="Description"
                icon={FileText}
                placeholder="Project Description"
              />
              <TextInput
                name="coverImage"
                label="Cover Image URL"
                icon={Image}
                placeholder="URL of cover image"
                type="text"
              />
              <TextInput
                name="githubUrl"
                label="GitHub URL (Optional)"
                placeholder="https://github.com/your-repo"
                type="text"
              />
              <TextInput
                name="liveUrl"
                label="Live URL (Optional)"
                icon={Link}
                placeholder="https://your-live-project.com"
                type="text"
              />
              <SelectDropdown
                name="category"
                label="Category"
                options={categoryOptions}
                placeholder="Select a category"
              />
            </div>
          </Form>
        </motion.div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
