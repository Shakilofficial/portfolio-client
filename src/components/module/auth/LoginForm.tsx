"use client";

import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginValidationSchema } from "./loginValidationSchema";

const LoginForm = () => {
  const { setIsLoading } = useUser();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 px-5 my-4">
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
      >
        <TextInput
          icon={Mail}
          name="email"
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <PasswordInput
          icon={Lock}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
      </Form>
    </div>
  );
};

export default LoginForm;
