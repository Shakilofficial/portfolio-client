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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextInputProps } from "./types";

export function PasswordInput({
  name,
  label,
  icon: Icon,
  description,
  placeholder,
  password,
  passwordConfirm,
}: TextInputProps & { password?: string; passwordConfirm?: string }) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  };

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
            <div className="relative">
              <Input
                className="text-xs pr-8"
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormControl>
          {passwordConfirm && password !== passwordConfirm ? (
            <FormMessage className="text-xs font-extralight text-red-500">
              Passwords do not match
            </FormMessage>
          ) : (
            <FormMessage className="text-xs font-extralight" />
          )}
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
