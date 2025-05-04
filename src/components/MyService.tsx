"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Database,
  Layers,
  LayoutDashboard,
  Palette,
  Server,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { AuroraText } from "./magicui/aurora-text";

const services = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web development using modern JavaScript/TypeScript, combining scalable backend with interactive frontend.",
    icon: Layers,
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JWT",
      "Zod",
      "Next Auth",
    ],
    color: "from-fuchsia-500 to-pink-600",
    darkColor: "from-fuchsia-600 to-pink-800",
    pattern: "circuit",
    patternColor: "rgba(232, 121, 249, 0.15)",
    highlightColor: "fuchsia",
  },
  {
    title: "Frontend Development",
    description:
      "Responsive and interactive UI with reusable components, animation, and modern design systems.",
    icon: Palette,
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux Toolkit",
      "React Hook Form",
      "TypeScript",
      "Shadcn UI",
      "Material UI",
      "Ant Design",
    ],
    color: "from-sky-500 to-cyan-600",
    darkColor: "from-sky-600 to-cyan-800",
    pattern: "dots",
    patternColor: "rgba(56, 189, 248, 0.15)",
    highlightColor: "sky",
  },
  {
    title: "Backend Development",
    description:
      "Secure and efficient backend systems with RESTful APIs, authentication, and scalable MongoDB integration.",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Mongoose",
      "Prisma",
      "RESTful APIs",
      "GraphQL",
      "JWT",
      "Zod",
      "OAuth",
    ],
    color: "from-lime-500 to-green-600",
    darkColor: "from-lime-600 to-green-800",
    pattern: "grid",
    patternColor: "rgba(132, 204, 22, 0.15)",
    highlightColor: "lime",
  },
  {
    title: "System Architecture",
    description:
      "Designing maintainable architecture using Modular Monolith and MVC patterns with clean code principles.",
    icon: LayoutDashboard,
    skills: [
      "MVC",
      "Modular Monolith",
      "Clean Code",
      "Agile Development",
      "Project Structuring",
    ],
    color: "from-indigo-500 to-blue-600",
    darkColor: "from-indigo-600 to-blue-800",
    pattern: "hexagons",
    patternColor: "rgba(99, 102, 241, 0.15)",
    highlightColor: "indigo",
  },
  {
    title: "Database & Integrations",
    description:
      "Effective data modeling, storage solutions, and third-party integrations for modern applications.",
    icon: Database,
    skills: [
      "MongoDB",
      "Firebase",
      "PostgreSQL",
      "Cloudinary",
      "Nodemailer",
    ],
    color: "from-orange-500 to-amber-600",
    darkColor: "from-orange-600 to-amber-800",
    pattern: "squares",
    patternColor: "rgba(251, 146, 60, 0.15)",
    highlightColor: "orange",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving app speed, responsiveness, and SEO using smart optimization strategies and tools.",
    icon: Zap,
    skills: [
      "Lazy Loading",
      "Code Splitting",
      "Caching",
      "Compression",
      "Responsive Design",
    ],
    color: "from-rose-500 to-red-600",
    darkColor: "from-rose-600 to-red-800",
    pattern: "triangles",
    patternColor: "rgba(244, 63, 94, 0.15)",
    highlightColor: "rose",
  },
];

const MyService = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950/30 dark:to-slate-900/30"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-[120px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-500/5 to-teal-500/5 blur-[100px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-[120px] opacity-40" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
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

        {/* Tech-inspired circuit lines */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.04]">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 text-slate-900 dark:text-slate-200"
          >
            <defs>
              <pattern
                id="circuit-pattern"
                x="0"
                y="0"
                width="800"
                height="800"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 10 H50 V50 H90 V90 H130 V130 H170 V170"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M190 10 V50 H150 V90 H110 V130 H70 V170 H30 V190"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="3" fill="currentColor" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
                <circle cx="90" cy="90" r="3" fill="currentColor" />
                <circle cx="130" cy="130" r="3" fill="currentColor" />
                <circle cx="170" cy="170" r="3" fill="currentColor" />
                <circle cx="190" cy="10" r="3" fill="currentColor" />
                <circle cx="150" cy="50" r="3" fill="currentColor" />
                <circle cx="110" cy="90" r="3" fill="currentColor" />
                <circle cx="70" cy="130" r="3" fill="currentColor" />
                <circle cx="30" cy="170" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              What I Do
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Services I Offer</AuroraText>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            Comprehensive development solutions tailored to transform your ideas
            into exceptional digital experiences using modern technologies and
            best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-purple-900/10 group">
                {/* Service-specific pattern background */}
                <div
                  className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage:
                      service.pattern === "dots"
                        ? `radial-gradient(${service.patternColor} 1px, transparent 1px)`
                        : service.pattern === "grid"
                        ? `linear-gradient(to right, ${service.patternColor} 1px, transparent 1px), 
                           linear-gradient(to bottom, ${service.patternColor} 1px, transparent 1px)`
                        : service.pattern === "circuit"
                        ? `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H40 V40 H70 V70 H90 V90' stroke='${encodeURIComponent(
                            service.patternColor
                          )}' fill='none' strokeWidth='1'/%3E%3Ccircle cx='10' cy='10' r='2' fill='${encodeURIComponent(
                            service.patternColor
                          )}'/%3E%3Ccircle cx='40' cy='40' r='2' fill='${encodeURIComponent(
                            service.patternColor
                          )}'/%3E%3Ccircle cx='70' cy='70' r='2' fill='${encodeURIComponent(
                            service.patternColor
                          )}'/%3E%3Ccircle cx='90' cy='90' r='2' fill='${encodeURIComponent(
                            service.patternColor
                          )}'/%3E%3C/svg%3E")`
                        : service.pattern === "zigzag"
                        ? `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 L20 0 L40 10 L60 0 L80 10 L100 0 L100 20 L0 20 Z' stroke='${encodeURIComponent(
                            service.patternColor
                          )}' fill='none' strokeWidth='1'/%3E%3C/svg%3E")`
                        : service.pattern === "squares"
                        ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' x='10' y='10' stroke='${encodeURIComponent(
                            service.patternColor
                          )}' fill='none' strokeWidth='1'/%3E%3Crect width='20' height='20' x='30' y='30' stroke='${encodeURIComponent(
                            service.patternColor
                          )}' fill='none' strokeWidth='1'/%3E%3C/svg%3E")`
                        : service.pattern === "triangles"
                        ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 40 L30 10 L50 40 Z' stroke='${encodeURIComponent(
                            service.patternColor
                          )}' fill='none' strokeWidth='1'/%3E%3C/svg%3E")`
                        : "",
                    backgroundSize:
                      service.pattern === "dots"
                        ? "20px 20px"
                        : service.pattern === "grid"
                        ? "30px 30px"
                        : service.pattern === "zigzag"
                        ? "100px 20px"
                        : "60px 60px",
                  }}
                />

                {/* Colored gradient accent */}
                <div
                  className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${service.color} dark:${service.darkColor} transition-all duration-300`}
                />

                {/* Animated corner accent */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${service.color} dark:${service.darkColor} opacity-10 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right`}
                />

                <div className="p-8 sm:p-10 h-full flex flex-col relative z-10">
                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} dark:${service.darkColor} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-2xl font-bold mb-3 group-hover:text-${service.highlightColor}-600 dark:group-hover:text-${service.highlightColor}-400 transition-colors duration-300`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {service.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-auto">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:bg-${service.highlightColor}-50 group-hover:border-${service.highlightColor}-200 dark:group-hover:bg-${service.highlightColor}-900/20 dark:group-hover:border-${service.highlightColor}-800/30 transition-colors duration-300`}
                            whileHover={{ y: -2 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Learn more link */}
                    <motion.div
                      className={`flex items-center text-sm font-medium transition-all duration-300 ${
                        hoveredIndex === index
                          ? `text-${service.highlightColor}-600 dark:text-${service.highlightColor}-400`
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      <span>Learn more</span>
                      <ArrowRight
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          hoveredIndex === index ? "translate-x-1" : ""
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyService;
