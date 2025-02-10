/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define form values type based on the schema
type FormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response?.data?.token) {
        const user = verifyToken(response.data.token);
        if (user && user.role === "admin") {
          dispatch(setUser({ user, token: response.data.token }));
          toast.success("Logged in successfully", { id: toastId });

          // Navigate to admin dashboard
          router.push("/admin");
        } else {
          toast.error("Access denied: Admins only", { id: toastId });
        }
      } else {
        toast.error("Invalid credentials", { id: toastId });
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Invalid credentials";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="space-y-6 px-5">
      {/* Form */}
      <Form form={form} onSubmit={onSubmit}>
        <TextInput
          name="email"
          label="Email"
          icon={Mail}
          placeholder="john@example.com"
          type="email"
        />
        <PasswordInput
          name="password"
          label="Password"
          icon={Lock}
          placeholder="Enter your password"
        />
      </Form>

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:underline"
        >
          Forgot your password?
        </Link>
        <div className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
