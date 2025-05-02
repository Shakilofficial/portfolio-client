/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllExperiencesQuery } from "@/redux/features/experience/experienceApi";
import type { TQueryParam } from "@/types/global";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AuroraText } from "./magicui/aurora-text";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  const queryParams: TQueryParam[] = [
    { name: "sortBy", value: "startDate" },
    { name: "sortOrder", value: "desc" },
  ];

  const {
    data: experienceData,
    isLoading,
    isError,
  } = useGetAllExperiencesQuery(queryParams);

  const [activeExperience, setActiveExperience] = useState<number>(0);

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  if (isError || !experienceData) {
    return (
      <div className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load experience data
        </h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const experiences = experienceData.data || [];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/30 bg-purple-50 dark:bg-purple-900/20">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              My Journey
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            <AuroraText>Professional Experience</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My journey through various roles and organizations that have shaped
            my professional career
          </p>
        </motion.div>

        {experiences.length > 0 ? (
          <motion.div
            style={{ opacity, y }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12"
          >
            {/* Timeline navigation */}
            <div className="w-full lg:w-1/3">
              <div className="space-y-3 sticky top-24">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setActiveExperience(index)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                      activeExperience === index
                        ? "bg-white dark:bg-slate-900 shadow-lg border border-purple-200 dark:border-purple-800/30"
                        : "bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800/50 hover:shadow-md"
                    }`}
                  >
                    {/* Vertical timeline connector */}
                    {index !== experiences.length - 1 && (
                      <div
                        className={`absolute left-[25px] top-[52px] bottom-[-16px] w-0.5 ${
                          activeExperience === index ||
                          activeExperience === index + 1
                            ? "bg-gradient-to-b from-purple-500 to-indigo-500"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <div
                        className={`relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${
                          activeExperience === index
                            ? "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-900"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {exp.companyLogo ? (
                          <Image
                            src={exp.companyLogo || "/placeholder.svg"}
                            alt={exp.company}
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <Briefcase className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3
                          className={`font-medium text-sm sm:text-base line-clamp-1 ${
                            activeExperience === index
                              ? "text-slate-900 dark:text-slate-100"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {exp.position}
                        </p>
                      </div>
                      {activeExperience === index && (
                        <ChevronRight className="w-5 h-5 text-purple-500 dark:text-purple-400 opacity-0 lg:opacity-100" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience details */}
            <div className="w-full lg:w-2/3">
              {experiences.length > 0 && (
                <motion.div
                  key={experiences[activeExperience]._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {experiences[activeExperience].position}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                          {experiences[activeExperience].companyLogo ? (
                            <Image
                              src={
                                experiences[activeExperience].companyLogo ||
                                "/placeholder.svg"
                              }
                              alt={experiences[activeExperience].company}
                              fill
                              sizes="24px"
                              className="object-contain p-0.5"
                            />
                          ) : (
                            <Building2 className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                          )}
                        </div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          {experiences[activeExperience].company}
                        </p>
                        {experiences[activeExperience].companyUrl && (
                          <Link
                            href={experiences[activeExperience].companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div>
                      {experiences[activeExperience].isCurrent && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
                          Current Position
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      <span>
                        {new Date(
                          experiences[activeExperience].startDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {experiences[activeExperience].endDate
                          ? new Date(
                              experiences[activeExperience].endDate
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : "Present"}
                      </span>
                    </div>
                    {experiences[activeExperience].location && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                        <span>{experiences[activeExperience].location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {experiences[activeExperience].description && (
                      <div className="bg-white dark:bg-slate-900 rounded-lg">
                        <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          Overview
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                          {experiences[activeExperience].description}
                        </p>
                      </div>
                    )}

                    {experiences[activeExperience].responsibilities &&
                      experiences[activeExperience].responsibilities.length >
                        0 && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg">
                          <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2 pl-10">
                            {experiences[activeExperience].responsibilities.map(
                              (responsibility: any, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                                >
                                  <ChevronRight className="w-4 h-4 text-purple-500 dark:text-purple-400 mt-1 flex-shrink-0" />
                                  <span>{responsibility}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {experiences[activeExperience].technologies &&
                      experiences[activeExperience].technologies.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg">
                          <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2 pl-10">
                            {experiences[activeExperience].technologies.map(
                              (tech: any, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 px-3 py-1"
                                >
                                  {tech}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Call to action */}
                  {experiences[activeExperience].companyUrl && (
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        asChild
                      >
                        <Link
                          href={experiences[activeExperience].companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Visit Company</span>
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
            <Briefcase className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              No experience data available
            </p>
            <Button variant="outline" className="mt-4">
              Add Experience
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceSkeleton = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
