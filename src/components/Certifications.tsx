"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  Calendar,
  GraduationCap,
  Trophy,
} from "lucide-react";
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
      gradient:
        "from-[#050a0a] to-[#051818] hover:from-[#05070a] hover:to-[#0b1a3b]",
      tagColor: "bg-green-500 group-hover:bg-blue-600",
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
      gradient:
        "from-[#242424] to-[#020202] hover:from-[#182135] hover:to-[#080808]",
      tagColor: "bg-blue-500 group-hover:bg-blue-400",
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
      gradient:
        "from-[#1f1135] to-[#0d0a1a] hover:from-[#2a1749] hover:to-[#130e24]",
      tagColor: "bg-indigo-500 group-hover:bg-indigo-400",
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
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <AuroraText>Education & Certifications</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications that
            demonstrate my commitment to continuous learning and expertise.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-semibold text-purple-500">
                Education
              </h3>
            </div>
            {certificationsData.education.map((edu, index) => (
              <motion.div key={index} variants={item}>
                <div className="group bg-gradient-to-t from-[#1a0b2e] to-[#2d1b69] hover:from-[#251444] hover:to-[#3b1d8c] relative before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5 rounded-2xl border border-white/10">
                  <div className="relative px-6 py-8">
                    <div className="bg-purple-500 group-hover:bg-purple-400 transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-white mb-4">
                      Education
                    </div>
                    <h4 className="text-xl font-semibold text-slate-200 mb-2">
                      {edu.degree}
                    </h4>
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                      <Building2 className="w-4 h-4" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.year}</span>
                    </div>
                    <p className="text-slate-300 mb-4">{edu.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {edu.achievements.map((achievement, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-white/5 text-slate-300 hover:bg-white/10"
                        >
                          <Trophy className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-slate-200 mb-2">
                        Key Courses
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-white/5 text-slate-300 hover:bg-white/10"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Award className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-semibold text-purple-500">
                Professional Certifications
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {certificationsData.certifications.map((cert, index) => (
                <motion.div key={index} variants={item}>
                  <div
                    className={`group bg-gradient-to-t ${cert.gradient} relative before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5 rounded-2xl border border-white/10`}
                  >
                    <div className="relative px-6 py-8">
                      <div
                        className={`${cert.tagColor} transition-all duration-500 ease-in-out w-fit px-3 rounded-full text-sm py-1 text-white mb-4`}
                      >
                        Certification
                      </div>
                      <h4 className="text-lg font-semibold text-slate-200 mb-2">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Building2 className="w-4 h-4" />
                        <span>{cert.platform}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.year}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-white/5 text-slate-300 hover:bg-white/10"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
