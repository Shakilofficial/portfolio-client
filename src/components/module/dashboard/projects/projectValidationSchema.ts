import { projectCategories } from "@/constants/projectCategory";
import { z } from "zod";

export const createProjectValidationSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  subtitle: z.string({ required_error: "Subtitle is required" }),
  description: z.string({ required_error: "Description is required" }),
  category: z.enum([...projectCategories] as [string, ...string[]]),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  technologies: z.array(z.string()),
});

export const updateProjectValidationSchema = z.object({
  title: z.string({ required_error: "Title is required" }).optional(),
  subtitle: z.string({ required_error: "Subtitle is required" }).optional(),
  description: z
    .string({ required_error: "Description is required" })
    .optional(),
  category: z.enum([...projectCategories] as [string, ...string[]]).optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
});
