"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { useMediaQuery } from "@/lib/use-media-query";
import { useGetAllSkillsQuery } from "@/redux/features/skill/skillApi";
import type { TSkillCategory } from "@/types/skill.type";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuroraText } from "./magicui/aurora-text";

const categoryColors = {
  Frontend: {
    color: "#4f46e5",
    gradient: "from-indigo-500/20 to-indigo-700/10",
    shadow: "shadow-indigo-500/20",
    icon: "🌐",
  },
  Backend: {
    color: "#16a34a",
    gradient: "from-green-500/20 to-green-700/10",
    shadow: "shadow-green-500/20",
    icon: "⚙️",
  },
  Language: {
    color: "#eab308",
    gradient: "from-yellow-500/20 to-yellow-700/10",
    shadow: "shadow-yellow-500/20",
    icon: "📝",
  },
  Tools: {
    color: "#9333ea",
    gradient: "from-purple-500/20 to-purple-700/10",
    shadow: "shadow-purple-500/20",
    icon: "🔧",
  },
  DevOps: {
    color: "#ea580c",
    gradient: "from-orange-500/20 to-orange-700/10",
    shadow: "shadow-orange-500/20",
    icon: "🚀",
  },
};

const defaultColor = {
  color: "#6b7280",
  gradient: "from-gray-500/20 to-gray-700/10",
  shadow: "shadow-gray-500/20",
  icon: "💻",
};

const categoryOrder = ["Frontend", "Backend", "Language", "Tools", "DevOps"];

const TechSkills = () => {
  const { data, isLoading, isError } = useGetAllSkillsQuery(undefined);

  const [orderedSkillCategories, setOrderedSkillCategories] = useState<TSkillCategory[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Frontend");

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (data) {
      const ordered = [...data];

      ordered.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
      });

      setOrderedSkillCategories(ordered);

      if (ordered.length > 0) {
        setActiveTab(ordered[0].category);
      }
    }
  }, [data]);

  if (isLoading) return <SkillsSkeleton />;

  if (isError || !data) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load skills
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "Frontend":
        return "Building modern, responsive user interfaces.";
      case "Backend":
        return "Developing scalable APIs and server architecture.";
      case "DevOps":
        return "Automation and deployment pipelines.";
      case "Tools":
        return "Essential tools for efficient development workflow.";
      case "Language":
        return "Core programming languages for building systems.";
      default:
        return "";
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-purple-800/30 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">
              Technical Stack
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <AuroraText>Skills & Technologies</AuroraText>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive overview of technologies I use to build modern scalable applications.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>

          {/* Mobile Dropdown */}
          {isMobile && (
            <div className="mb-8">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full border border-white/30 dark:border-white/10 bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl rounded-xl shadow-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent className="rounded-xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-white/20">
                  {orderedSkillCategories.map((category) => {
                    const style =
                      categoryColors[
                      category.category as keyof typeof categoryColors
                      ] || defaultColor;

                    return (
                      <SelectItem key={category.category} value={category.category}>
                        <div className="flex items-center gap-2">
                          <span>{style.icon}</span>
                          {category.category}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Desktop Tabs */}
          {!isMobile && (
            <div className="mb-10 flex justify-center">
              <div className="inline-flex bg-white/20 dark:bg-slate-900/40 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-2xl shadow-sm p-1">

                {orderedSkillCategories.map((category) => {
                  const style =
                    categoryColors[
                    category.category as keyof typeof categoryColors
                    ] || defaultColor;

                  const isActive = activeTab === category.category;

                  return (
                    <button
                      key={category.category}
                      onClick={() => setActiveTab(category.category)}
                      className={`relative mx-1 rounded-xl flex items-center font-bold uppercase tracking-wider transition-all duration-500 ${isTablet ? "py-2 px-4 text-sm" : "py-3 px-6"
                        }`}
                      style={{ color: isActive ? "#fff" : style.color }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl -z-10"
                          style={{
                            background: `linear-gradient(to right, ${style.color}, ${style.color}dd)`,
                          }}
                        />
                      )}

                      <span className="mr-2 text-xl">{style.icon}</span>
                      {category.category}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content */}
          {orderedSkillCategories.map((category) => {
            const style =
              categoryColors[
              category.category as keyof typeof categoryColors
              ] || defaultColor;

            if (activeTab !== category.category) return null;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold mb-2" style={{ color: style.color }}>
                    {category.category}
                  </h3>

                  <p className="text-muted-foreground max-w-xl mx-auto">
                    {getCategoryDescription(category.category)}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-3xl bg-gradient-to-br ${style.gradient} backdrop-blur-sm border border-white/20 ${style.shadow}`}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        className="group flex flex-col items-center bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 hover:bg-white/40 transition-all duration-500"
                      >

                        <div className="relative w-16 h-16 mb-4 p-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 flex items-center justify-center">
                          <Image
                            src={skill.icon || "/placeholder.svg"}
                            alt={skill.name}
                            fill
                            sizes="64px"
                            className="object-contain p-2"
                          />
                        </div>

                        <span className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                          {skill.name}
                        </span>

                      </motion.div>
                    ))}

                  </div>
                </div>

              </motion.div>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

const SkillsSkeleton = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto text-center">
      <Skeleton className="h-12 w-72 mx-auto mb-4 rounded-lg" />
      <Skeleton className="h-6 w-96 mx-auto rounded-md" />
      <Skeleton className="h-[500px] mt-10 rounded-3xl" />
    </div>
  </section>
);

export default TechSkills;

