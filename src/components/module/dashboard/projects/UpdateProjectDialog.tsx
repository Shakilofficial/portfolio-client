/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { MultiSelect } from "@/components/form/MultipleSelect";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { TextEditorField } from "@/components/form/TextEditorField";
import { TextInput } from "@/components/form/TextInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectCategoryOptions } from "@/constants/projectCategory";
import { updateProject } from "@/services/projectService";
import { getAllSKills } from "@/services/skillService";
import { IProject, ITechnology } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateProjectValidationSchema } from "./projectValidationSchema";

const UpdateProjectDialog = ({ project }: { project: IProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    project?.coverImage ? [project?.coverImage] : []
  );
  const [technologies, setTechnologies] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const { data } = await getAllSKills("1", "20");
        setTechnologies(data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchTechnologies();
  }, []);

  const form = useForm({
    resolver: zodResolver(updateProjectValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: project?.title || "",
      subtitle: project?.subtitle || "",
      category: project?.category || "",
      description: project?.description || "",
      liveUrl: project?.liveUrl || "",
      githubUrl: project?.githubUrl || "",
      technologies: project?.technologies?.map((t: ITechnology) => t._id) || [],
    },
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (imageFiles.length > 0) {
        formData.append("coverImage", imageFiles[0]);
      }

      const res = await updateProject(formData, project._id);
      console.log(formData);
      if (res?.success) {
        toast.success("Project updated successfully");
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to update project");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="inline-flex items-center justify-center rounded-md p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Pencil className="h-4 w-4" />
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border-2 border-primary/50">
        <DialogHeader className="w-full text-center text-primary">
          <DialogTitle className="text-xl">Edit Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isValid={isValid}
          >
            <TextInput
              name="title"
              label="Project Title"
              placeholder="Enter your project title"
            />
            <TextInput
              name="subtitle"
              label="Project Subtitle"
              placeholder="Enter your project subtitle"
            />
            <SelectDropdown
              name="category"
              label="Category"
              options={projectCategoryOptions}
              placeholder="Select a category"
            />
            <MultiSelect
              name="technologies"
              label="Technologies Used"
              options={technologies?.map((s) => ({
                value: s._id,
                label: s.name,
              }))}
            />
            <TextInput
              name="githubUrl"
              label="Github Url"
              placeholder="Github Url of the Project"
            />
            <TextInput
              name="liveUrl"
              label="Website Url"
              placeholder="Website Url of the Project"
            />
            <TextEditorField
              name="description"
              label="Project Description"
              description="Write your project description here"
              placeholder="Start writing your amazing project description..."
            />
            <div className="flex flex-col">
              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  className="mt-4"
                />
              ) : (
                <ImageUploader
                  name="coverImage"
                  label="Upload Cover Image"
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                />
              )}
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectDialog;
