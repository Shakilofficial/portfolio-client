/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { MultiSelect } from "@/components/form/MultipleSelect";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { TextEditorField } from "@/components/form/TextEditorField";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectCategoryOptions } from "@/constants/projectCategory";
import { createProject } from "@/services/projectService";
import { getAllSKills } from "@/services/skillService";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderGit2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProjectValidationSchema } from "./projectValidationSchema";

const CreateProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
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
    resolver: zodResolver(createProjectValidationSchema),
    mode: "onChange",
    defaultValues: {
      technologies: [],
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
      formData.append("coverImage", imageFiles[0] as File);

      const res = await createProject(formData);
      if (res?.success) {
        toast.success(res?.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to create project");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"}>
            <span className="flex justify-center items-center gap-1">
              <Plus />
              <FolderGit2 />
            </span>
            Add Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border-2 border-primary/50">
          <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
            <DialogTitle className="text-xl text-center">
              Add a New Project
            </DialogTitle>
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
                label="Github URL"
                placeholder="Github URL of the Project"
              />
              <TextInput
                name="liveUrl"
                label="Website URL"
                placeholder="Website URL of the Project"
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
    </div>
  );
};

export default CreateProjectDialog;
