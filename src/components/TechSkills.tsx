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
    gradient: "from-indigo-500/30 to-indigo-700/30",
    shadowHover: "hover:shadow-lg hover:shadow-indigo-500/30",
    shadow: "shadow-indigo-500/20",
    icon: "🌐",
  },
  Backend: {
    color: "#16a34a",
    gradient: "from-green-500/30 to-green-700/30",
    shadowHover: "hover:shadow-lg hover:shadow-green-500/30",
    shadow: "shadow-green-500/20",
    icon: "⚙️",
  },
  Language: {
    color: "#eab308",
    gradient: "from-yellow-500/30 to-yellow-700/30",
    shadowHover: "hover:shadow-lg hover:shadow-yellow-500/30",
    shadow: "shadow-yellow-500/20",
    icon: "📝",
  },
  Tools: {
    color: "#9333ea",
    gradient: "from-purple-500/30 to-purple-700/30",
    shadowHover: "hover:shadow-lg hover:shadow-purple-500/30",
    shadow: "shadow-purple-500/20",
    icon: "🔧",
  },
  DevOps: {
    color: "#ea580c",
    gradient: "from-orange-500/30 to-orange-700/30",
    shadowHover: "hover:shadow-lg hover:shadow-orange-500/30",
    shadow: "shadow-orange-500/20",
    icon: "🚀",
  },
};

const defaultColor = {
  color: "#6b7280",
  gradient: "from-gray-500/30 to-gray-700/30",
  shadowHover: "hover:shadow-lg hover:shadow-gray-500/30",
  shadow: "shadow-gray-500/20",
  icon: "💻",
};

const categoryOrder = ["Frontend", "Backend", "Language", "Tools", "DevOps"];

const TechSkills = () => {
  const {
    data: skillCategoriesData,
    isLoading,
    isError,
  } = useGetAllSkillsQuery(undefined);

  const [orderedSkillCategories, setOrderedSkillCategories] = useState<
    TSkillCategory[]
  >([]);

  const [activeTab, setActiveTab] = useState<string>("Frontend");

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (skillCategoriesData) {
      const ordered = [...skillCategoriesData];
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
  }, [skillCategoriesData]);

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  if (isError || !skillCategoriesData) {
    return (
      <div className="py-10 px-4 text-center">
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
        return "Building modern, responsive user interfaces with cutting-edge technologies";
      case "Backend":
        return "Creating robust server-side applications and APIs with scalable architecture";
      case "DevOps":
        return "Streamlining development operations with efficient tools and practices";
      case "Tools":
        return "Utilizing industry-standard tools for efficient development workflow";
      case "Language":
        return "Core programming languages for building robust applications";
      default:
        return "Specialized technologies for modern development";
    }
  };

  const getCurrentCategoryStyle = () => {
    return (
      categoryColors[activeTab as keyof typeof categoryColors] || defaultColor
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-background/90 to-background/80 relative overflow-hidden">
      {/* Circular gradient patterns in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient circles */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-xl opacity-10 dark:opacity-[0.07] blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${
              getCurrentCategoryStyle().color
            } 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-xl opacity-10 dark:opacity-[0.07] blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${
              getCurrentCategoryStyle().color
            } 0%, transparent 70%)`,
          }}
        />

        {/* Medium gradient circles */}
        <div
          className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-xl opacity-10 dark:opacity-[0.05] blur-2xl"
          style={{
            background: `radial-gradient(circle at center, ${
              getCurrentCategoryStyle().color
            } 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-1/4 left-20 w-[250px] h-[250px] rounded-xl opacity-10 dark:opacity-[0.05] blur-2xl"
          style={{
            background: `radial-gradient(circle at center, ${
              getCurrentCategoryStyle().color
            } 0%, transparent 70%)`,
          }}
        />

        {/* Small gradient circles */}
        {categoryOrder.map((category, index) => {
          const categoryStyle =
            categoryColors[category as keyof typeof categoryColors] ||
            defaultColor;
          return (
            <div
              key={category}
              className="absolute w-[150px] h-[150px] rounded-xl opacity-10 dark:opacity-[0.05] blur-xl"
              style={{
                background: `radial-gradient(circle at center, ${categoryStyle.color} 0%, transparent 70%)`,
                top: `${15 + index * 20}%`,
                left: `${(index % 2 === 0 ? 80 : 10) + index * 5}%`,
                transform: `translate(-50%, -50%) scale(${0.8 + index * 0.1})`,
              }}
            />
          );
        })}

        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              My Skills
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            <AuroraText>Skills & Technologies</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {isMobile ? (
            <div className="mb-8">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger
                  className="w-full mb-4 border-2 transition-all duration-300 rounded-xl shadow-md backdrop-blur-sm"
                  style={{
                    borderColor: getCurrentCategoryStyle().color,
                    backgroundColor: `${getCurrentCategoryStyle().color}15`,
                  }}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {orderedSkillCategories.map((category) => {
                    const categoryStyle =
                      categoryColors[
                        category.category as keyof typeof categoryColors
                      ] || defaultColor;
                    return (
                      <SelectItem
                        key={category.category}
                        value={category.category}
                        className="text-base py-2 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-lg">
                            {categoryStyle.icon}
                          </span>
                          <span>{category.category}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="mb-10">
              <div className="flex justify-center">
                <div className="inline-flex bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl p-1.5">
                  {orderedSkillCategories.map((category) => {
                    const categoryStyle =
                      categoryColors[
                        category.category as keyof typeof categoryColors
                      ] || defaultColor;
                    const isActive = activeTab === category.category;

                    return (
                      <button
                        key={category.category}
                        onClick={() => setActiveTab(category.category)}
                        className={`
                          relative mx-1 rounded-xl
                          transition-all duration-300
                          flex items-center justify-center
                          text-sm font-medium
                          ${
                            isActive
                              ? "text-white"
                              : "text-foreground hover:text-foreground/80 hover:bg-background/80"
                          }
                          ${isTablet ? "py-1.5 px-3" : "py-2 px-4"}
                        `}
                        style={{
                          backgroundColor: isActive
                            ? categoryStyle.color
                            : "transparent",
                          boxShadow: isActive
                            ? `0 4px 10px -2px ${categoryStyle.color}60`
                            : "none",
                        }}
                      >
                        <span className="mr-2 text-base">
                          {categoryStyle.icon}
                        </span>
                        {category.category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {orderedSkillCategories.map((category) => {
            const categoryStyle =
              categoryColors[
                category.category as keyof typeof categoryColors
              ] || defaultColor;

            return (
              <div
                key={category.category}
                className={activeTab === category.category ? "block" : "hidden"}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="text-center mb-8">
                    <motion.h3
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-bold mb-2"
                      style={{ color: categoryStyle.color }}
                    >
                      {category.category}
                    </motion.h3>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
                      {getCategoryDescription(category.category)}
                    </p>
                  </div>

                  <div
                    className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${categoryStyle.gradient} backdrop-blur-sm border border-border/30 ${categoryStyle.shadow} shadow-lg relative overflow-hidden`}
                  >
                    {/* Inner circular gradient for the card */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${categoryStyle.color}30 0%, transparent 60%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `radial-gradient(circle at 70% 70%, ${categoryStyle.color}20 0%, transparent 50%)`,
                      }}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 relative z-10">
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={skill._id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.04,
                            type: "spring",
                            stiffness: 100,
                          }}
                          whileHover={{
                            scale: 1.08,
                            y: -5,
                            boxShadow: `0 15px 30px -5px ${categoryStyle.color}40`,
                          }}
                          className={`flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-border/50 transition-all duration-300 hover:border-opacity-80 ${categoryStyle.shadowHover}`}
                          style={{
                            borderColor: categoryStyle.color,
                          }}
                        >
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 p-2 rounded-xl bg-background/90 flex items-center justify-center shadow-md">
                            <Image
                              src={skill.icon || "/placeholder.svg"}
                              alt={skill.name}
                              fill
                              sizes="64px"
                              className="object-contain p-2.5"
                            />
                            <div
                              className="absolute inset-0 rounded-xl opacity-30"
                              style={{
                                background: `radial-gradient(circle at center, ${categoryStyle.color} 0%, transparent 70%)`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm sm:text-base font-medium text-center">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

// Enhanced loading skeleton
const SkillsSkeleton = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-72 mx-auto mb-4 rounded-lg" />
          <Skeleton className="h-6 w-full max-w-md mx-auto rounded-md" />
        </div>

        <div className="flex justify-center mb-10">
          <Skeleton className="h-14 w-full max-w-3xl rounded-xl" />
        </div>

        <Skeleton className="h-[500px] w-full rounded-3xl" />
      </div>
    </section>
  );
};

export default TechSkills;
