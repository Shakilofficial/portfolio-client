import { LucideIcon } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface BaseInputProps {
  name: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export interface FormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  children: React.ReactNode;
  isSubmitting?: boolean;
  isValid?: boolean;
}

export interface TextInputProps extends BaseInputProps {
  placeholder?: string;
  type?: "text" | "email" | "number" | "password";
}

export interface SelectProps extends BaseInputProps {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export interface DatePickerProps extends BaseInputProps {
  placeholder?: string;
  disabled?: boolean;
}

export interface TextareaProps extends BaseInputProps {
  placeholder?: string;
}
