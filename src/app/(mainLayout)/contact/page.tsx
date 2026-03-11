/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form } from "@/components/form/Form";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { AuroraText } from "@/components/magicui/aurora-text";
import CalendlyEmbed from "@/components/shared/CalendlyEmbed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateMessageMutation } from "@/redux/features/message/messageApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Clock,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User
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
      isActive: copied === "Email",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1620-521215",
      action: () => copyToClipboard("+880 1620-521215", "Phone"),
      isActive: copied === "Phone",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Tangail, Dhaka, Bangladesh",
      action: () => window.open("https://maps.app.goo.gl/f4q9wJC6hVmjynB16", "_blank"),
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/ShakilOfficial", color: "hover:text-gray-400" },
    { icon: Linkedin, href: "https://linkedin.com/in/md-shakilhossain", color: "hover:text-blue-400" },
    { icon: Facebook, href: "https://www.facebook.com/iamshakilhossain", color: "hover:text-blue-600" },
  ];

  return (
    <div className="relative w-full min-h-screen pt-28 pb-12 px-4 md:px-6 lg:px-8 bg-white dark:bg-[#030712]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-md mb-6">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-heading">
              Contact Me
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-serif text-slate-900 dark:text-white">
            <AuroraText>Let&apos;s Launch Your Vision</AuroraText>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
            Whether you have a specific project in mind or just want to explore possibilities, I&apos;m here to help you navigate the digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: Contact Form & Info */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-purple-200/50 dark:border-purple-800/30 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xs shadow-sm overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold dark:text-white">Send a Message</h3>
                      <p className="text-sm text-slate-500">I usually respond within 24 hours.</p>
                    </div>
                  </div>

                  <Form form={form} onSubmit={onSubmit}>
                    <div className="space-y-6">
                      <TextInput name="name" label="Full Name" icon={User} placeholder="What should I call you?" />
                      <TextInput name="email" label="Email Address" icon={Mail} placeholder="name@example.com" type="email" />
                      <Textarea name="message" label="Your Message" icon={MessageCircle} placeholder="Tell me about your project or inquiry..." />
                    </div>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
            >
              <div className="p-6 rounded-2xl border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/30 dark:bg-purple-900/10 backdrop-blur-sm flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-purple-500 shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">LinkedIn</p>
                  <Link href="https://linkedin.com/in/md-shakilhossain" target="_blank" className="text-sm font-semibold hover:text-purple-500 transition-colors dark:text-slate-200">Connect Professionally</Link>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 bg-blue-50/30 dark:bg-blue-900/10 backdrop-blur-sm flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-blue-500 shadow-sm">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">GitHub</p>
                  <Link href="https://github.com/ShakilOfficial" target="_blank" className="text-sm font-semibold hover:text-blue-500 transition-colors dark:text-slate-200">Explore Open Source</Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Embedded Calendly */}
          <motion.div
            className="lg:col-span-12 xl:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-purple-200/50 dark:border-purple-800/30 bg-transparent backdrop-blur-xs shadow-sm overflow-hidden">
              <div className="p-8 border-b border-purple-100 dark:border-purple-800/50 flex items-center justify-between bg-purple-50/30 dark:bg-purple-900/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-purple-500 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold dark:text-white">Schedule a Discovery Call</h3>
                    <p className="text-sm text-slate-500">Find a slot that works for you.</p>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Instant Booking</Badge>
              </div>
              <CalendlyEmbed />
            </Card>
          </motion.div>
        </div>

        {/* Global Footer in Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200 dark:border-slate-800">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-purple-200/20 dark:border-purple-800/20 bg-white/50 dark:bg-slate-900/40 text-center group cursor-pointer"
              onClick={item.action}
            >
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-purple-600">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
              <p className="font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
