/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
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
import { blogCategoryOptions } from "@/constants/blogCategory";
import { createBlog } from "@/services/BlogService";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createBlogValidationSchema } from "./blogValidationSchema";

const CreateBlogDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(createBlogValidationSchema),
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
      formData.append("thumbnail", imageFiles[0] as File);

      const res = await createBlog(formData);
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
              <FileText />
            </span>
            Add Blog
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border-2 border-primary/50">
          <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
            <DialogTitle className="text-xl text-center">
              Add a New Blog
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
                label="Blog Title"
                placeholder="Enter your blog title"
              />
              <TextInput
                name="subtitle"
                label="Blog Subtitle"
                placeholder="Enter your blog subtitle"
              />
              <SelectDropdown
                name="category"
                label="Category"
                options={blogCategoryOptions}
                placeholder="Select a category"
              />

              <TextEditorField
                name="content"
                label="Blog Content"
                description="Write your blog content here"
                placeholder="Start writing your amazing blog post..."
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
                    name="thumbnail"
                    label="Upload Thumbnail"
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

export default CreateBlogDialog;
