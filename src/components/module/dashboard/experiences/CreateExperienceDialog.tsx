/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DatePicker } from "@/components/form/DatePicker";
import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createExperience } from "@/services/experienceService";
import { formatISODate } from "@/utils/formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createExperienceValidationSchema } from "./experienceValidationSchema";

const CreateExperienceDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createExperienceValidationSchema),
    mode: "onChange",
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

      const response = await createExperience(formattedData);

      if (response.success) {
        toast.success(response.message || "Experience created successfully");
        reset();
        setIsOpen(false);
      } else {
        toast.error(response.message || "Failed to create experience");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <span className="flex justify-center items-center gap-1">
            <Plus />
            <Briefcase />
          </span>
          Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border-2 border-primary/50 p-4 md:p-6">
        <DialogHeader className="w-full mx-auto flex justify-center text-center text-primary">
          <DialogTitle className="text-lg md:text-xl text-center">
            Add a New Experience
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

export default CreateExperienceDialog;
