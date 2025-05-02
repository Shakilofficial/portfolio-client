/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Building2,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { useRef } from "react";
import { AuroraText } from "./magicui/aurora-text";

const certificationsData = {
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "National University",
      year: "2028 - 2023",
      description:
        "Focused on software engineering, algorithms, and web technologies",
      achievements: ["3.28 GPA"],
      courses: [
        "System Design",
        "Algorithms",
        "Web Development",
        "Microprocessor Design",
      ],
    },
  ],
  certifications: [
    {
      title: "Next Level Web Development",
      platform: "Programming Hero",
      year: "2024-2025",
      credential: "PH-123456",
      skills: [
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "React",
        "Redux",
        "Next.js",
      ],
      color: "emerald",
      icon: "code",
    },
    {
      title: "Thinking in a Redux Way",
      platform: "Learn with Sumit",
      year: "2024",
      credential: "LS-123456",
      skills: [
        "Redux",
        "React",
        "RTK Query",
        "Tailwind CSS",
        "JavaScript",
        "JSON-Server",
        "React Hooks",
      ],
      color: "blue",
      icon: "database",
    },
    {
      title: "Complete Web Development",
      platform: "Programming Hero",
      year: "2023-2024",
      credential: "PSM-123456",
      skills: [
        "HTML",
        "CSS",
        "Tailwind CSS",
        "JavaScript",
        "DOM",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Next.js",
      ],
      color: "violet",
      icon: "layout",
    },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent opacity-30" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              My Qualifications
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Education & Certifications</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My academic background and professional certifications that
            demonstrate my commitment to continuous learning and expertise.
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="space-y-16">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                Education
              </h3>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              {certificationsData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="group relative">
                    {/* Timeline connector */}
                    <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-purple-500 to-indigo-500 opacity-30 ml-0.5" />

                    <div className="relative pl-16">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20" />

                      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="p-8">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {edu.degree}
                            </h4>
                            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50 px-3 py-1 text-sm">
                              {edu.year}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
                            <Building2 className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">
                              {edu.institution}
                            </span>
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                            {edu.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {edu.achievements.map((achievement, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm"
                              >
                                <Trophy className="w-3.5 h-3.5" />
                                {achievement}
                              </div>
                            ))}
                          </div>

                          <div>
                            <h5 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500" />
                              Key Courses
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((course, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                                >
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20">
                <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Professional Certifications
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {certificationsData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="group h-full bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Top accent bar */}
                    <div
                      className={`h-1.5 w-full bg-${cert.color}-500 dark:bg-${cert.color}-600`}
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg bg-${cert.color}-100 dark:bg-${cert.color}-900/20`}
                        >
                          <Award
                            className={`w-5 h-5 text-${cert.color}-600 dark:text-${cert.color}-400`}
                          />
                        </div>
                        <Badge
                          className={`bg-${cert.color}-100 hover:bg-${cert.color}-200 text-${cert.color}-800 dark:bg-${cert.color}-900/30 dark:text-${cert.color}-300 dark:hover:bg-${cert.color}-900/50`}
                        >
                          {cert.year}
                        </Badge>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                        {cert.title}
                      </h4>

                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{cert.platform}</span>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          Skills & Technologies
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.slice(0, 6).map((skill, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-slate-50 dark:bg-slate-800/50 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {cert.skills.length > 6 && (
                            <Badge
                              variant="outline"
                              className="bg-slate-50 dark:bg-slate-800/50 text-xs"
                            >
                              +{cert.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Credential: {cert.credential}
                          </div>
                          <button
                            className={`flex items-center gap-1 text-xs font-medium text-${cert.color}-600 dark:text-${cert.color}-400 group-hover:underline`}
                          >
                            <span>View certificate</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
