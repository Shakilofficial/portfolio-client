"use client";
import { Button } from "@/components/ui/button";
import { Form as ShadcnForm } from "@/components/ui/form";
import { FormProps } from "./form.type";

export function Form<TFieldValues extends Record<string, unknown>>({
  form,
  onSubmit,
  children,
}: FormProps<TFieldValues>) {
  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {children}
        <Button
          type="submit"
          className="w-full bg-purple-900 text-white hover:bg-purple-700/20"
        >
          Submit
        </Button>
      </form>
    </ShadcnForm>
  );
}
