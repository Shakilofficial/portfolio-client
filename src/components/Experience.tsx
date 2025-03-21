/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { useGetAllExperiencesQuery } from "@/redux/features/experience/experienceApi";
import type { TQueryParam } from "@/types/global";
import { motion } from "framer-motion";
import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AuroraText } from "./magicui/aurora-text";
import { Skeleton } from "./ui/skeleton";

const Experience = () => {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-3">
            <AuroraText>Professional Experience</AuroraText>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey through various roles and organizations
          </p>
        </motion.div>

        {experiences.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Timeline navigation */}
            <div className="w-full lg:w-1/3">
              <div className="space-y-3 sticky top-20">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setActiveExperience(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeExperience === index
                        ? "bg-primary/10 border-l-4 border-primary shadow-md"
                        : "bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-background flex items-center justify-center">
                        {exp.companyLogo ? (
                          <Image
                            src={exp.companyLogo || "/placeholder.svg"}
                            alt={exp.company}
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <Briefcase className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base line-clamp-1">
                          {exp.company}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {exp.position}
                        </p>
                      </div>
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
                  className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {experiences[activeExperience].position}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-background">
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
                            <Briefcase className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <p className="font-medium">
                          {experiences[activeExperience].company}
                        </p>
                        {experiences[activeExperience].companyUrl && (
                          <Link
                            href={experiences[activeExperience].companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div>
                      {experiences[activeExperience].isCurrent && (
                        <Badge variant="default" className="mb-2">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
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
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{experiences[activeExperience].location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {experiences[activeExperience].description && (
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Overview</h4>
                        <p className="text-muted-foreground">
                          {experiences[activeExperience].description}
                        </p>
                      </div>
                    )}

                    {experiences[activeExperience].responsibilities &&
                      experiences[activeExperience].responsibilities.length >
                        0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Key Responsibilities
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {experiences[activeExperience].responsibilities.map(
                              (responsibility:any, idx: number) => (
                                <li key={idx} className="pl-2">
                                  {responsibility}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {experiences[activeExperience].technologies &&
                      experiences[activeExperience].technologies.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experiences[activeExperience].technologies.map(
                              (tech: any, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="rounded-full"
                                >
                                  {tech}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No experience data available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceSkeleton = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
