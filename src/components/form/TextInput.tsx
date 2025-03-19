"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { TextInputProps } from "./types";

export function TextInput({
  name,
  label,
  icon: Icon,
  description,
  placeholder,
  type = "text",
}: TextInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className="text-xs"
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage  className="text-xs font-extralight" />
        </FormItem>
      )}
    />
  );
}
