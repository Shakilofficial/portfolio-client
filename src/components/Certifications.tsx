"use client";

import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Star,
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
      credential: "WEB8-4270",
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
      color: "purple",
      icon: Award,
      bgGradient: "from-violet-500 to-purple-600",
      patternColor: "rgba(139, 92, 246, 0.1)",
    },
    {
      title: "Thinking in a Redux Way",
      platform: "Learn with Sumit",
      year: "2024",
      credential: "LWSCTXN-YNBAMMLL",
      skills: [
        "Redux",
        "React",
        "RTK Query",
        "Tailwind CSS",
        "JavaScript",
        "JSON-Server",
        "React Hooks",
      ],
      color: "emerald",
      icon: Star,
      bgGradient: "from-emerald-500 to-teal-600",
      patternColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Complete Web Development",
      platform: "Programming Hero",
      year: "2023-2024",
      credential: "WEB8-4270",
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
      color: "blue",
      icon: BookOpen,
      bgGradient: "from-blue-500 to-cyan-600",
      patternColor: "rgba(59, 130, 246, 0.1)",
    },
  ],
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
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950/30 dark:to-slate-900/30"
    >
      {/* Geometric background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hexagon pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V8.04L30 0zm0 5.38L5 20v20l25 14.62L55 40V20L30 5.38z' fill='%23a855f7' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "10px 10px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-[120px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-[100px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-[120px] opacity-40" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
              style={{
                width: Math.random() * 2 + 2 + "px",
                height: Math.random() * 2 + 2 + "px",
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

        {/* Border accents */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-200 dark:via-purple-800/30 to-transparent opacity-70" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-200 dark:via-blue-800/30 to-transparent opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              My Qualifications
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Education & Certifications</AuroraText>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            My academic background and professional certifications that
            demonstrate my commitment to continuous learning and expertise.
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="space-y-16">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-sm shadow-lg shadow-purple-500/10">
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
                      {/* Timeline dot with pulse effect */}
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20">
                        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75"></div>
                      </div>

                      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        {/* Top gradient bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-indigo-500" />

                        {/* Card pattern background */}
                        <div
                          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23a855f7' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E")`,
                          }}
                        />

                        <div className="p-8 relative">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {edu.degree}
                            </h4>
                            <Badge className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 text-purple-800 dark:text-purple-300 border-0 px-3 py-1 text-sm">
                              <Calendar className="w-3.5 h-3.5 mr-1" />
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
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 text-sm"
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
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
                                >
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Hover effect line */}
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
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
                  className="group"
                >
                  <div className="h-full bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Top accent bar with gradient */}
                    <div
                      className={`h-1.5 w-full bg-gradient-to-r ${cert.bgGradient}`}
                    />

                    {/* Card pattern background */}
                    <div
                      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodeURIComponent(
                          cert.patternColor
                        )}' fillOpacity='1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />

                    <div className="p-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${cert.bgGradient} bg-opacity-20 shadow-lg shadow-${cert.color}-500/20`}
                        >
                          <cert.icon
                            className={`w-5 h-5 text-${cert.color}-600 dark:text-${cert.color}-400`}
                          />
                        </div>
                        <Badge
                          className={`bg-gradient-to-r ${cert.bgGradient} bg-opacity-10 text-${cert.color}-800 dark:text-${cert.color}-300 border-0`}
                        >
                          {cert.year}
                        </Badge>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
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
                              className={`bg-${cert.color}-50 dark:bg-${cert.color}-900/10 text-${cert.color}-700 dark:text-${cert.color}-300 border-${cert.color}-200 dark:border-${cert.color}-800/30 text-xs hover:bg-${cert.color}-100 dark:hover:bg-${cert.color}-900/20 transition-colors duration-200`}
                            >
                              {skill}
                            </Badge>
                          ))}
                          {cert.skills.length > 6 && (
                            <Badge
                              variant="outline"
                              className={`bg-${cert.color}-50 dark:bg-${cert.color}-900/10 text-${cert.color}-700 dark:text-${cert.color}-300 border-${cert.color}-200 dark:border-${cert.color}-800/30 text-xs hover:bg-${cert.color}-100 dark:hover:bg-${cert.color}-900/20 transition-colors duration-200`}
                            >
                              +{cert.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Credential: {cert.credential}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-1 text-xs font-medium text-${cert.color}-600 dark:text-${cert.color}-400 hover:underline`}
                          >
                            <span>View certificate</span>
                            <ExternalLink className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Hover effect line */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${cert.bgGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                      />
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
