"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Server } from "lucide-react";
import { useState } from "react";
import { AuroraText } from "./magicui/aurora-text";

const services = [
  {
    title: "Full-Stack Development",
    description: "Custom web applications tailored to your business needs.",
    icon: Code,
    skills: ["React", "Next.js", "Node.js", "MongoDB", "Express"],
    color: "from-violet-500 to-purple-600",
    darkColor: "from-violet-600 to-purple-800",
    pattern: "circles",
  },
  {
    title: "Frontend Development",
    description:
      "Beautiful and responsive user interfaces for your applications.",
    icon: Palette,
    skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript", "Redux"],
    color: "from-blue-500 to-cyan-600",
    darkColor: "from-blue-600 to-cyan-800",
    pattern: "dots",
  },
  {
    title: "Backend Development",
    description:
      "Robust and scalable server-side solutions for your applications.",
    icon: Server,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"],
    color: "from-emerald-500 to-teal-600",
    darkColor: "from-emerald-600 to-teal-800",
    pattern: "grid",
  },
];

const MyService = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          {/* Scattered dots */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-current"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              What I Do
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Services I Offer</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Providing professional services tailored to meet diverse project
            needs with modern technologies and best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-purple-900/20">
                {/* Background pattern based on service type */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  {service.pattern === "circles" && (
                    <div className="absolute inset-0">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-current"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {service.pattern === "dots" && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                  )}
                  {service.pattern === "grid" && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, currentColor 1px, transparent 1px),
                          linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: "24px 24px",
                      }}
                    />
                  )}
                </div>

                {/* Colored gradient accent */}
                <div
                  className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${service.color} dark:${service.darkColor} transition-all duration-300`}
                />

                <div className="p-8 sm:p-10 h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} dark:${service.darkColor} flex items-center justify-center shadow-lg`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-auto">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.skills.map((skill, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Learn more link */}
                    <div
                      className={`flex items-center text-sm font-medium transition-all duration-300 ${
                        hoveredIndex === index
                          ? `text-${
                              service.color.split("-")[0]
                            }-500 dark:text-${service.color.split("-")[0]}-400`
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <span>Learn more</span>
                      <ArrowRight
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          hoveredIndex === index ? "translate-x-1" : ""
                        }`}
                      />
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
