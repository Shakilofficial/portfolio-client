/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
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
import { blogCategories, blogCategoryOptions } from "@/constants/blogCategory";
import { updateBlog } from "@/services/BlogService";
import type { IBlog } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateBlogValidationSchema } from "./blogValidationSchema";

const UpdateBlogDialog = ({ blog }: { blog: IBlog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    blog?.thumbnail ? [blog.thumbnail] : []
  );

  const form = useForm({
    resolver: zodResolver(updateBlogValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: blog?.title || "",
      subtitle: blog?.subtitle || "",
      category: blogCategories.includes(blog?.category as any)
        ? (blog?.category as (typeof blogCategories)[number])
        : undefined,
      content: blog?.content || "",
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
        formData.append("thumbnail", imageFiles[0]);
      }

      const res = await updateBlog(formData, blog._id);
      if (res?.success) {
        toast.success("Blog updated successfully");
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to update blog");
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
          <DialogTitle className="text-xl">Edit Blog</DialogTitle>
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
              placeholder="Enter blog title"
            />
            <TextInput
              name="subtitle"
              label="Blog Subtitle"
              placeholder="Enter blog subtitle"
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
              description="Edit your blog content here"
              placeholder="Update your blog post..."
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
  );
};

export default UpdateBlogDialog;
