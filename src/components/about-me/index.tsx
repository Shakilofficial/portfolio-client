"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  Coffee,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  Music,
  Palette,
  Plane,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaFootball } from "react-icons/fa6";
import { AuroraText } from "../magicui/aurora-text";

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const driveLink =
    "https://drive.google.com/file/d/1HYhZ7ApwPkrFpDJM1TvigWJarxeqsRdn/view?usp=sharing";

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  // Personal info data
  const personalInfo = {
    name: "Shakil Hossain",
    title: "Full Stack Developer",
    location: "Tangail, Dhaka, Bangladesh",
    email: "mrshakilhossain@outlook.com",
    github: "Shakilofficial",
    linkedin: "md-shakilhossain",
    website: "https://shakil-tawny.vercel.app",
    bio: "I'm a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js, and MongoDB, creating seamless user experiences with clean, efficient code. My journey in tech began with a curiosity about how websites work, which led me to pursue a degree in Computer Science and Engineering.",
    longBio:
      "Beyond coding, I'm deeply interested in UI/UX design principles and believe that great software should not only function flawlessly but also delight users with intuitive interfaces. I'm constantly learning new technologies and techniques to stay at the forefront of web development. When I'm not coding, you'll find me exploring new hiking trails, experimenting with photography, or contributing to open-source projects.",
  };

  // Skills data
  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "Framer Motion",
      ],
      icon: Palette,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Mongoose",
        "MongoDB",
        "PostgreSQL",
        "REST API",
      ],
      icon: Code,
      color: "from-emerald-500 to-teal-500",
    },
    {
      category: "Tools & Others",
      items: ["Git", "Docker", "AWS", "Firebase", "Vercel", "Figma", "CI/CD"],
      icon: Briefcase,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  // Education data
  const education = [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "National University",
      years: "2018 - 2023",
      description:
        "Focused on software engineering, algorithms, and web technologies",
      gpa: "3.28/4.00",
    },
  ];

  // Interests data
  const interests = [
    { name: "Open Source", icon: Github },
    { name: "Travel", icon: Plane },
    { name: "sports", icon: FaFootball },
    { name: "Music", icon: Music },
    { name: "Reading", icon: BookOpen },
    { name: "Coffee", icon: Coffee },
    { name: "Podcasts", icon: Mic },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-12 lg:py-28 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950/10 dark:to-slate-900/10"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-[120px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 blur-[100px] opacity-60" />

        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Dotted background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full container mx-auto px-2 md:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>About Me</AuroraText>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            A passionate developer dedicated to crafting beautiful, functional
            web experiences
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Profile section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sticky top-24 space-y-8"
            >
              {/* Profile card */}
              <div className="relative bg-white/90 dark:bg-purple-900/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
                {/* Top colored bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-blue-500" />

                {/* Profile image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dcyupktj6/image/upload/v1746154677/my-avtar-profile_ezyfub.png"
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Profile info */}
                <div className="p-6 relative">
                  <div className="absolute -top-16 inset-x-0 flex justify-center">
                    <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                      <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 hover:from-purple-200 hover:to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-300 border-0 px-3 py-1">
                        Available for Projects
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-4 mb-1 text-center">
                    {personalInfo.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium text-center mb-4">
                    {personalInfo.title}
                  </p>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <span>{personalInfo.github}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Linkedin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <span>{personalInfo.linkedin}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <span>{personalInfo.website}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                    <Button
                      onClick={() => window.open(driveLink, "_blank")}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  </div>
                </div>
              </div>

              {/* Interests card */}
              <div className="bg-white/90 dark:bg-violet-900/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl p-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>Interests & Hobbies</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white dark:bg-slate-700 shadow-sm">
                        <interest.icon className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {interest.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/90 dark:bg-slate-900/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 shadow-sm">
                  <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  My Story
                </h3>
              </div>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{personalInfo.bio}</p>
                <p>{personalInfo.longBio}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="bg-white dark:bg-slate-900 border-purple-200 dark:border-purple-800/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  asChild
                >
                  <Link href="/projects">
                    <span>View Projects</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  asChild
                >
                  <Link href="/contact">
                    <span>Contact Me</span>
                    <Mail className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Skills section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/90 dark:bg-pink-900/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-sm">
                  <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Skills & Expertise
                </h3>
              </div>

              <div className="space-y-8">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${skillGroup.color} shadow-sm`}
                      >
                        <skillGroup.icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {skillGroup.category}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2 ml-10">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: skillIndex * 0.05 + 0.2,
                          }}
                        >
                          <Badge
                            className={`bg-gradient-to-r ${
                              index === 0
                                ? "from-blue-50 to-cyan-50 text-blue-700 hover:from-blue-100 hover:to-cyan-100"
                                : index === 1
                                ? "from-emerald-50 to-teal-50 text-emerald-700 hover:from-emerald-100 hover:to-teal-100"
                                : "from-purple-50 to-indigo-50 text-purple-700 hover:from-purple-100 hover:to-indigo-100"
                            } dark:from-slate-800 dark:to-slate-800 dark:text-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-700 border-0 px-3 py-1.5 text-sm font-medium`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 dark:bg-blue-900/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-xl bg-white" />
                    </div>

                    {/* Timeline line */}
                    {index !== education.length - 1 && (
                      <div className="absolute left-3 top-7 bottom-0 w-px bg-gradient-to-b from-emerald-500 to-teal-500 opacity-50" />
                    )}

                    <div className="bg-gradient-to-br from-emerald-50/50 to-slate-50/50 dark:from-emerald-900/10 dark:to-slate-900/10 rounded-xl border border-emerald-100/50 dark:border-emerald-800/20 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {edu.degree}
                        </h4>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 border-0 px-3 py-1">
                          {edu.years}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
                        <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{edu.institution}</span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {edu.description}
                      </p>

                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Award className="w-4 h-4" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
