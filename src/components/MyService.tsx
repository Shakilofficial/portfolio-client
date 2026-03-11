/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Layers,
  Palette,
  Server,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AuroraText } from "./magicui/aurora-text";

const services = [
  {
    title: "Full-Stack Development",
    description:
      "Developing end-to-end, high-performance web applications with seamless integration between scalable backends and modern, interactive frontends.",
    icon: Layers,
    skills: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Redux", "Tailwind CSS"],
    color: "from-fuchsia-500 to-pink-600",
    darkColor: "from-fuchsia-600 to-pink-800",
    pattern: "circuit",
    patternColor: "rgba(232, 121, 249, 0.15)",
    highlightColor: "fuchsia",
  },
  {
    title: "Frontend Engineering",
    description:
      "Crafting pixel-perfect, responsive user interfaces with a focus on accessibility, modern design patterns, and smooth micro-interactions.",
    icon: Palette,
    skills: ["React", "Next.js", "Framer Motion", "Shadcn UI", "Tailwind CSS", "TypeScript", "Three.js", "GSAP"],
    color: "from-sky-500 to-cyan-600",
    darkColor: "from-sky-600 to-cyan-800",
    pattern: "dots",
    patternColor: "rgba(56, 189, 248, 0.15)",
    highlightColor: "sky",
  },
  {
    title: "Backend Architecture",
    description:
      "Building robust, secure, and highly scalable server-side systems with optimized database management and efficient API structures.",
    icon: Server,
    skills: ["Node.js", "Express", "Mongoose", "PostgreSQL", "Prisma", "Redis", "JWT/OAuth", "REST/GraphQL"],
    color: "from-lime-500 to-green-600",
    darkColor: "from-lime-600 to-green-800",
    pattern: "grid",
    patternColor: "rgba(132, 204, 22, 0.15)",
    highlightColor: "lime",
  },
  {
    title: "System Design & Architecture",
    description:
      "Architecting complex software systems using Modular Monolith, Microservices, and Clean Architecture patterns for long-term maintainability.",
    icon: ShieldCheck,
    skills: ["System Design", "Clean Architecture", "Modular Monolith", "Design Patterns", "UML", "Agile", "UAT"],
    color: "from-indigo-500 to-blue-600",
    darkColor: "from-indigo-600 to-blue-800",
    pattern: "hexagons",
    patternColor: "rgba(99, 102, 241, 0.15)",
    highlightColor: "indigo",
  },
  {
    title: "DevOps & Cloud Deployment",
    description:
      "Streamlining development workflows with CI/CD pipelines and managing scalable cloud infrastructure for zero-downtime deployments.",
    icon: Cloud,
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx", "Linux Server", "Cloudflare", "Monitoring"],
    color: "from-orange-500 to-amber-600",
    darkColor: "from-orange-600 to-amber-800",
    pattern: "squares",
    patternColor: "rgba(251, 146, 60, 0.15)",
    highlightColor: "orange",
  },
  {
    title: "Systems Optimization",
    description:
      "Enhancing application performance, security, and scalability through advanced caching, code splitting, and database indexing strategies.",
    icon: Zap,
    skills: ["Performance Audit", "Caching", "SEO Opt", "Security", "Scale Up", "Load Balancing", "Query Opt"],
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
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map((_, i) => ({
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        yDest: Math.random() * -100 - 50,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

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
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-[120px] opacity-60" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 blur-[100px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-[120px] opacity-40" />

        {/* Floating particles */}
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm">
            <span className="text-xs font-bold font-heading uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">
              Services Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-serif tracking-tight">
            <AuroraText>My Premium Services</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Delivering high-end, scalable digital solutions with a focus on architecture, performance, and user experience.
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
              <div className="relative h-full rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                {/* Dynamic gradient background on hover */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${service.color} dark:${service.darkColor} mix-blend-soft-light`}
                />

                <div className="p-10 sm:p-12 h-full flex flex-col relative z-10">
                  {/* Icon with interactive container */}
                  <div className="mb-8 relative">
                    <motion.div
                      className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${service.color} dark:${service.darkColor} flex items-center justify-center shadow-2xl relative z-10`}
                      whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    {/* Shadow effect for icon */}
                    <div className={`absolute -bottom-2 -right-2 w-20 h-20 rounded-[2rem] bg-gradient-to-br ${service.color} dark:${service.darkColor} blur-xl opacity-20`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* Skills with enhanced chips */}
                  <div className="mt-auto">
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2.5">
                        {service.skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive link */}
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-purple-500 transition-colors duration-300">
                      <span>Explore Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
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
