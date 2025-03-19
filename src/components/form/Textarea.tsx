"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";

import { useFormContext } from "react-hook-form";
import { TextareaProps } from "./types";

export function Textarea({
  name,
  label,
  icon: Icon,
  description,
  placeholder,
}: TextareaProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="text-xs">
          <FormLabel className="flex items-center gap-2 mb-1">
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </FormLabel>
          <FormControl>
            <ShadcnTextarea placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs font-extralight" />
        </FormItem>
      )}
    />
  );
}
