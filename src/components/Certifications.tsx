/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useRef, useState } from "react";
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
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    setParticles(
      [...Array(20)].map((_, i) => ({
        width: Math.random() * 2 + 2,
        height: Math.random() * 2 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        yDest: Math.random() * -100 - 50,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

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
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-[120px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-[100px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-[120px] opacity-40" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
              style={{
                width: particle.width + "px",
                height: particle.height + "px",
                top: particle.top + "%",
                left: particle.left + "%",
              }}
              animate={{
                y: [0, particle.yDest],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: particle.duration,
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
          <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm">
            <span className="text-xs font-bold font-heading uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">
              My Qualifications
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">
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
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20">
                        <div className="absolute inset-0 rounded-xl bg-purple-500 animate-ping opacity-75"></div>
                      </div>

                      <div className="bg-white/50 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-slate-800 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden group">
                        <div className="p-10 relative">
                          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                            <h4 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                              {edu.degree}
                            </h4>
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20">
                              {edu.year}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 mb-6 font-bold uppercase tracking-[0.2em] text-xs">
                            <Building2 className="w-5 h-5" />
                            <span>{edu.institution}</span>
                          </div>

                          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed max-w-3xl">
                            {edu.description}
                          </p>

                          <div className="flex flex-wrap gap-3 mb-8">
                            {edu.achievements.map((achievement, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest border border-green-500/20"
                              >
                                <Trophy className="w-4 h-4" />
                                {achievement}
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                            {edu.courses.map((course, i) => (
                              <div key={i} className="flex items-center gap-3 group/item">
                                <div className="w-2 h-2 rounded-full bg-purple-500 group-hover/item:scale-150 transition-transform duration-300" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{course}</span>
                              </div>
                            ))}
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
                  <div className="h-full bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group/cert">
                    <div className="p-8 relative">
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.bgGradient} shadow-lg shadow-purple-500/20 group-hover/cert:scale-110 transition-transform duration-500`}
                        >
                          <cert.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                          {cert.year}
                        </div>
                      </div>

                      <h4 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover/cert:text-purple-500 transition-colors duration-300">
                        {cert.title}
                      </h4>

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-6 font-bold uppercase tracking-widest text-[10px]">
                        <Building2 className="w-4 h-4" />
                        <span>{cert.platform}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {cert.skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-medium text-slate-400">
                          ID: {cert.credential}
                        </span>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </motion.button>
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
