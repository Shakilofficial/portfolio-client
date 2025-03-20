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
import { skillsCategoryOptions } from "@/constants/skillsCategory";
import { createSkill } from "@/services/skillService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createSkillValidationSchema } from "./skillsValidationSchema";

const CreateSkillDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(createSkillValidationSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("icon", imageFiles[0] as File);

      const res = await createSkill(formData);
      if (res?.success) {
        toast.success(res?.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to create blog");
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
              <ShieldCheck />
            </span>
            Add Skill
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm md:max-w-md rounded-lg border-2 border-primary/50">
          <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
            <DialogTitle className="text-xl text-center ">
              Add a New Skill
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
                name="name"
                label="Skill Name"
                placeholder="Enter your skill name"
              />
              <SelectDropdown
                name="category"
                label="Category"
                options={skillsCategoryOptions}
                placeholder="Select a category"
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
                    name="icon"
                    label="Upload Icon"
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

export default CreateSkillDialog;
