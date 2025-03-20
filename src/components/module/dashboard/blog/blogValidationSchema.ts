import { BlogCategory } from "@/constants/blogCategory";
import { z } from "zod";

export const createBlogValidationSchema = z.object({
  title: z.string().min(3).max(50).trim(),
  subtitle: z.string().min(3).max(50).trim(),
  category: z.nativeEnum(BlogCategory),
  content: z.string().min(10).trim(),
});

export const updateBlogValidationSchema = z.object({
  title: z.string().min(3).max(50).trim().optional(),
  subtitle: z.string().min(3).max(50).trim().optional(),
  category: z.nativeEnum(BlogCategory).optional(),
  content: z.string().min(10).trim().optional(),
});
