/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DatePicker } from "@/components/form/DatePicker";
import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateExperience } from "@/services/experienceService";
import { IExperience } from "@/types";
import { formatISODate } from "@/utils/formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createExperienceValidationSchema } from "./experienceValidationSchema";

const UpdateExperienceDialog = ({
  experience,
}: {
  experience: IExperience;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createExperienceValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: experience.title,
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
    },
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        startDate: formatISODate(data.startDate),
        endDate: formatISODate(data.endDate),
      };
      const response = await updateExperience(formattedData, experience._id);
      if (response.success) {
        toast.success(response?.message || "Experience updated successfully");
        reset();
        setIsOpen(false);
      } else {
        toast.error(
          response.message || "Failed to update experience. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="inline-flex items-center justify-center rounded-md p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Pencil className="h-4 w-4" />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border-2 border-primary/50 p-4 md:p-6">
        <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
          <DialogTitle className="text-lg md:text-xl text-center">
            Edit Experience
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isValid={isValid}
          >
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <TextInput
                name="title"
                label="Experience Title"
                placeholder="Enter your experience title"
              />
              <TextInput
                name="company"
                label="Company Name"
                placeholder="Enter your company name"
              />
              <TextInput
                name="position"
                label="Position"
                placeholder="Enter your position"
              />
              <TextInput
                name="location"
                label="Location"
                placeholder="Enter your location"
              />
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <DatePicker
                name="startDate"
                label="Start Date"
                placeholder="Select start date"
              />
              <DatePicker
                name="endDate"
                label="End Date"
                placeholder="End date can be epmty for current position"
              />
            </div>
            <div className="grid gap-4">
              <Textarea
                name="description"
                label="Experience Description"
                placeholder="Enter your experience description"
              />
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExperienceDialog;
