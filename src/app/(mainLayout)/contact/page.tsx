/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Globe } from "@/components/magicui/globe";
import { useCreateMessageMutation } from "@/redux/features/message/messageApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, MessageCircle, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const messageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Define form values type based on the schema
type FormValues = z.infer<typeof messageSchema>;

const ContactPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const [createMessage] = useCreateMessageMutation();

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Sending your message...");
    try {
      await createMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      }).unwrap();
      toast.success("Message sent successfully", { id: toastId });
      form.reset();
    } catch (error) {
      toast.error("Failed to send message", { id: toastId });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-background py-20 pt-24 px-6 md:px-12 ">
      <motion.div
        className="text-center my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          <AuroraText>Contact</AuroraText>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Reach out to me for any inquiries or feedback.
        </p>
      </motion.div>
      {/* Globe Effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Globe className="absolute top-0 left-0 w-full h-full opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-12 text-center text-foreground">
        {/* Form Section */}
        <div className="bg-transparent">
          <Form form={form} onSubmit={onSubmit}>
            <div className="space-y-6">
              <TextInput
                name="name"
                label="Name"
                icon={User}
                placeholder="John Doe"
                type="text"
              />
              <TextInput
                name="email"
                label="Email"
                icon={Mail}
                placeholder="john@example.com"
                type="email"
              />
              <Textarea
                name="message"
                label="Message"
                icon={MessageCircle}
                placeholder="Enter your message"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
