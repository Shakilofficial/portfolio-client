/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Globe } from "@/components/magicui/globe";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateMessageMutation } from "@/redux/features/message/messageApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Clock,
  Copy,
  ExternalLink,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const [copied, setCopied] = useState<string | null>(null);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      await createMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      }).unwrap();
      toast.success("Message sent successfully! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success(`${type} copied to clipboard!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mrshakilhossain@outlook.com",
      action: () => copyToClipboard("mrshakilhossain@outlook.com", "Email"),
      actionIcon: Copy,
      isActive: copied === "Email",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1620-521215",
      action: () => copyToClipboard("+880 1620-521215", "Phone"),
      actionIcon: Copy,
      isActive: copied === "Phone",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Tangail, Dhaka, Bangladesh",
      action: () =>
        window.open("https://maps.app.goo.gl/f4q9wJC6hVmjynB16", "_blank"),
      actionIcon: ExternalLink,
      isActive: false,
    },
    {
      icon: Clock,
      label: "Availability",
      value: "Anytime",
      action: null,
      actionIcon: null,
      isActive: false,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ShakilOfficial",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/md-shakilhossain",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/iamshakilhossain",
      label: "Facebook",
    },
  ];

  return (
    <div className="relative w-full min-h-screen py-8 md:py-12 lg:py-28 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-[100px]"
          style={{
            animation: "float 15s ease-in-out infinite alternate",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-[100px]"
          style={{
            animation: "float 20s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* Globe Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Globe className="absolute top-0 left-0 w-full h-full opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Get In Touch</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Feel free to reach
            out through the form below or via my contact information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-purple-200/50 dark:border-purple-800/30 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-3">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  Send a Message
                </h3>

                <Form form={form} onSubmit={onSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextInput
                        name="name"
                        label="Full Name"
                        icon={User}
                        placeholder="John Doe"
                        type="text"
                      />
                      <TextInput
                        name="email"
                        label="Email Address"
                        icon={Mail}
                        placeholder="john@example.com"
                        type="email"
                      />
                    </div>
                    <Textarea
                      name="message"
                      label="Your Message"
                      icon={MessageCircle}
                      placeholder="Tell me about your project, questions, or feedback..."
                    />
                  </div>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="overflow-hidden border border-purple-200/50 dark:border-purple-800/30 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-3">
                    <Phone className="h-5 w-5" />
                  </span>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-4 mt-1">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.label}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.value}</p>
                          {item.action && item.actionIcon && (
                            <button
                              onClick={item.action}
                              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                            >
                              <item.actionIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-purple-200/50 dark:border-purple-800/30 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5" />
                  </span>
                  Connect With Me
                </h3>

                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <social.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <span>{social.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <Badge variant="outline" className="text-xs">
                    Response time: Usually within 24 hours
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
