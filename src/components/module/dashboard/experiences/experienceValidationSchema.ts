import { z } from "zod";

export const createExperienceValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  company: z
    .string()
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name must be less than 50 characters"),
  position: z
    .string()
    .min(3, "Position must be at least 3 characters")
    .max(50, "Position must be less than 50 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(50, "Location must be less than 50 characters"),
  startDate: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a valid date",
  }),
  endDate: z.coerce
    .date({
      invalid_type_error: "End date must be a valid date",
    })
    .optional()
    .nullable(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(1000, "Description must be less than 500 characters")
    .optional(),
});

export const updateExperienceValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters")
    .optional(),
  company: z
    .string()
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name must be less than 50 characters")
    .optional(),
  position: z
    .string()
    .min(3, "Position must be at least 3 characters")
    .max(50, "Position must be less than 50 characters")
    .optional(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(50, "Location must be less than 50 characters")
    .optional(),
  startDate: z.coerce
    .date({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a valid date",
    })
    .optional(),
  endDate: z.coerce
    .date({
      invalid_type_error: "End date must be a valid date",
    })
    .optional()
    .nullable(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(1000, "Description must be less than 500 characters")
    .optional(),
});
