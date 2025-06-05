"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  GraduationCap,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useRef, useState } from "react";
import AnimatedCounter from "../shared/AnimatedCounter";

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
      bgGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      glowColor: "rgba(139, 92, 246, 0.4)",
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
      bgGradient: "from-emerald-400 via-teal-500 to-cyan-500",
      glowColor: "rgba(16, 185, 129, 0.4)",
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
      bgGradient: "from-blue-400 via-indigo-500 to-purple-500",
      glowColor: "rgba(59, 130, 246, 0.4)",
    },
  ],
};

const FloatingOrb = ({ delay = 0, duration = 20, size = "w-32 h-32" }) => (
  <motion.div
    className={`absolute ${size} rounded-full blur-3xl opacity-20`}
    style={{
      background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981)",
    }}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
);

const EduQualifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30" />

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Orbs */}
        <FloatingOrb delay={0} duration={25} size="w-96 h-96" />
        <FloatingOrb delay={5} duration={30} size="w-64 h-64" />
        <FloatingOrb delay={10} duration={35} size="w-48 h-48" />

        {/* Radial Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              My Qualifications
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl sm:text-7xl font-black mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-100 dark:to-white bg-clip-text text-transparent">
              Education &
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            My academic foundation and professional certifications showcase my
            dedication to continuous learning and technical excellence in modern
            web development.
          </motion.p>
        </motion.div>

        <motion.div style={{ opacity }} className="space-y-24">
          {/* Education Section */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl shadow-purple-500/25">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 opacity-20 blur-xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Education
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Academic Foundation
                </p>
              </div>
            </motion.div>

            {certificationsData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="relative">
                  {/* Glassmorphism Card */}
                  <div className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden group-hover:scale-[1.02] group-hover:rotate-1">
                    {/* Animated Border */}
                    <div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ padding: "2px" }}
                    >
                      <div className="w-full h-full rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl" />
                    </div>

                    {/* Content */}
                    <div className="relative p-10">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div>
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {edu.degree}
                          </h4>
                          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                            <Building2 className="w-5 h-5" />
                            <span className="text-lg font-medium">
                              {edu.institution}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200/50 dark:border-purple-700/50"
                        >
                          <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <span className="font-semibold text-purple-800 dark:text-purple-300">
                            {edu.year}
                          </span>
                        </motion.div>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                        {edu.description}
                      </p>

                      {/* Achievements */}
                      <div className="flex flex-wrap gap-4 mb-8">
                        {edu.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/50 dark:border-green-700/50"
                          >
                            <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-700 dark:text-green-300">
                              GPA: <AnimatedCounter value="3.28" />
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Courses */}
                      <div>
                        <h5 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-purple-500" />
                          Key Courses
                        </h5>
                        <div className="flex flex-wrap gap-3">
                          {edu.courses.map((course, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-4 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300"
                            >
                              <span className="font-medium text-slate-800 dark:text-slate-200">
                                {course}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Section */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-600 shadow-2xl shadow-blue-500/25">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-600 opacity-20 blur-xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Professional Certifications
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Industry Recognition
                </p>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {certificationsData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotateY: 5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group perspective-1000"
                >
                  <div className="relative h-full">
                    {/* Glow Effect */}
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{
                        background: `linear-gradient(45deg, ${cert.glowColor}, transparent, ${cert.glowColor})`,
                      }}
                    />

                    {/* Main Card */}
                    <div className="relative h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl overflow-hidden transform-gpu">
                      {/* Top Gradient Bar */}
                      <div
                        className={`h-2 w-full bg-gradient-to-r ${cert.bgGradient}`}
                      />

                      {/* Floating Icon */}
                      <div className="absolute top-6 right-6">
                        <motion.div
                          animate={{
                            rotate: hoveredCard === index ? 360 : 0,
                            scale: hoveredCard === index ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cert.bgGradient} flex items-center justify-center shadow-lg`}
                        >
                          <cert.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>

                      <div className="p-8">
                        <div className="mb-6">
                          <Badge
                            className={`bg-gradient-to-r ${cert.bgGradient} bg-opacity-10 text-white border-0 mb-4`}
                          >
                            {cert.year}
                          </Badge>

                          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {cert.title}
                          </h4>

                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-6">
                            <Building2 className="w-4 h-4" />
                            <span className="font-medium">{cert.platform}</span>
                          </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="mb-6">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                            Technologies
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {cert.skills.slice(0, 6).map((skill, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm text-xs font-medium text-slate-700 dark:text-slate-300 text-center hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-200"
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                          {cert.skills.length > 6 && (
                            <div className="text-center mt-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                +{cert.skills.length - 6} more technologies
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              ID: {cert.credential}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="group/btn hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10"
                            >
                              <span className="text-xs font-medium">View</span>
                              <ArrowUpRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 px-8 py-4 rounded-2xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EduQualifications;
