import { z } from "zod";

export const createSkillValidationSchema = z.object({
  name: z.string().min(3).max(50).trim(),
  icon: z.string().url().trim().optional(),
  category: z.enum(["Language", "Frontend", "Backend", "DevOps", "Tools"]),
});

export const updateSkillValidationSchema = z.object({
  name: z.string().min(3).max(50).trim().optional(),
  icon: z.string().url().trim().optional(),
  category: z
    .enum(["Language", "Frontend", "Backend", "DevOps", "Tools"])
    .optional(),
});
