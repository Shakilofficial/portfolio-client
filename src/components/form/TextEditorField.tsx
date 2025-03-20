/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { TextEditor } from "../core/TextEditor/TextEditor";

interface TextEditorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export function TextEditorField<T extends FieldValues>({
  name,
  label,
  description,
  placeholder,
  className,
  defaultValue,
}: TextEditorFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <TextEditor
      name={name}
      label={label}
      description={description}
      placeholder={placeholder}
      control={control as Control<any>}
      className={className}
      error={error}
      defaultValue={defaultValue}
    />
  );
}
