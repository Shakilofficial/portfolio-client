/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  skillsCategories,
  skillsCategoryOptions,
} from "@/constants/skillsCategory";
import { updateSkill } from "@/services/skillService";
import type { ISkill } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateSkillValidationSchema } from "./skillsValidationSchema";

const UpdateSkillDialog = ({ skill }: { skill: ISkill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    skill?.icon ? [skill.icon] : []
  );

  const form = useForm({
    resolver: zodResolver(updateSkillValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: skill?.name || "",
      category: skillsCategories.includes(skill?.category as any)
        ? (skill?.category as (typeof skillsCategories)[number])
        : undefined,
    },
  });

  const { reset, formState } = form;
  const { isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (imageFiles.length > 0) {
        formData.append("icon", imageFiles[0]);
      }

      const res = await updateSkill(formData, skill._id);

      if (res?.success) {
        toast.success("Skill updated successfully");
        reset();
      } else {
        toast.error(res?.message || "Skill update failed");
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update skill");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-red-100 dark:hover:bg-red-900/20"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Edit Skill
          </DialogTitle>
        </DialogHeader>

        <Form
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          <TextInput
            name="name"
            label="Skill Name"
            placeholder="Enter skill name"
          />

          <SelectDropdown
            name="category"
            label="Category"
            options={skillsCategoryOptions}
            placeholder="Select category"
          />

          <div className="space-y-4">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <ImageUploader
                name="icon"
                label="Skill Icon"
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
              />
            )}
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSkillDialog;
