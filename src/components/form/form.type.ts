import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface BaseInputProps {
  name: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export interface FormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  children: ReactNode;
}

export interface TextInputProps extends BaseInputProps {
  placeholder?: string;
  type?: "text" | "email" | "number";
}

export interface PasswordInputProps extends BaseInputProps {
  placeholder?: string;
}

export interface TextareaProps extends BaseInputProps {
  placeholder?: string;
}
