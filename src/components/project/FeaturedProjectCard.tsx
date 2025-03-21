"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TProject } from "@/types/project.type";
import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface FeaturedProjectCardProps {
  project: TProject;
}

const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
  return (
    <CardContainer className="inter-var w-full max-w-md">
      <CardBody className="relative border border-purple-200/50 dark:border-purple-800/30 bg-gradient-to-b from-white to-purple-50/30 dark:from-gray-950 dark:to-purple-950/10 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-auto">
        {/* Project Image */}
        <CardItem translateZ="100" className="w-full mb-4">
          <div className="relative w-full h-40 overflow-hidden rounded-lg">
            <Image
              src={project?.coverImage || "/placeholder.svg"}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              alt={`${project?.title} Thumbnail`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
          </div>
        </CardItem>

        {/* Title and Subtitle */}
        <CardItem
          translateZ="50"
          className="text-lg font-bold text-gray-900 dark:text-white"
        >
          {project?.title}
        </CardItem>

        {/* Category Badge */}
        <div className="mt-3">
          <Badge className="bg-purple-600/90 text-white text-xs font-medium px-2 py-1">
            {project?.category}
          </Badge>
        </div>

        {/* Technologies */}
        <CardItem translateZ="50" className="mt-4">
          <div className="flex flex-wrap gap-2">
            {project?.technologies?.slice(0, 4).map((tech) => (
              <Badge
                key={tech._id}
                variant="outline"
                className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 text-xs border-purple-200 dark:border-purple-800/50 px-2 py-1"
              >
                {tech.icon && (
                  <div className="h-3 w-3 relative flex-shrink-0">
                    <Image
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="text-gray-800 dark:text-gray-200">
                  {tech.name}
                </span>
              </Badge>
            ))}
            {project?.technologies?.length > 4 && (
              <Badge
                variant="outline"
                className="bg-white/80 dark:bg-gray-900/80 text-xs border-purple-200 dark:border-purple-800/50"
              >
                +{project?.technologies?.length - 4}
              </Badge>
            )}
          </div>
        </CardItem>

        {/* Buttons */}
        <CardItem translateZ="50" className="mt-6 w-full">
          <div className="flex flex-col gap-3">
            <Button
              asChild
              variant="default"
              size="sm"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href={`/projects/${project?._id}`}>
                <ExternalLink className="mr-2 h-4 w-4" /> View Details
              </Link>
            </Button>
            <div className="flex justify-center gap-3">
              {project?.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                >
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              )}
              {project?.liveUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                >
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default FeaturedProjectCard;
