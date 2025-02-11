"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TProject } from "@/types/project.type";
import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface FeaturedProjectCardProps {
  project: TProject;
}

const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
  return (
    <CardContainer className="inter-var w-full md:w-[28rem] max-w-full h-[30rem]">
      <CardBody className="relative group/card border border-purple-300 dark:border-purple-700 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-background rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Project Title */}
        <CardItem
          translateZ="50"
          className="text-2xl font-semibold text-purple-800 dark:text-purple-300"
        >
          {project?.title}
        </CardItem>

        {/* Subtitle / Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-gray-600 dark:text-gray-400 text-sm min-h-[4rem] mt-2"
        >
          {project?.subtitle}
        </CardItem>

        {/* Project Thumbnail */}
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={project?.coverImage}
            height={1000}
            width={1000}
            className="h-48 w-full object-cover rounded-xl aspect-[16/9] group-hover/card:shadow-xl transition-transform duration-300 hover:scale-[1.02]"
            alt="Project Thumbnail"
          />
        </CardItem>

        {/* Technologies Used */}
        <CardItem translateZ="50">
          <div className="flex flex-wrap gap-2 mt-10">
            {project?.technologies?.slice(0, 3).map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-200 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
              >
                {tech}
              </Badge>
            ))}
            {project?.technologies?.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-purple-200 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
              >
                +{project?.technologies?.length - 3}
              </Badge>
            )}
          </div>
        </CardItem>

        {/* Action Buttons */}
        <CardItem
          translateZ="50"
          className="mt-6 flex justify-evenly items-center gap-2"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs px-3 py-1 text-purple-700 hover:text-purple-800 hover:bg-purple-200 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/50"
          >
            <Link
              href={project?.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-1 h-4 w-4" /> Repo
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-xs px-3 py-1 border border-purple-700 text-purple-700 hover:text-purple-800 hover:bg-purple-200 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/50"
          >
            <Link href={`/projects/${project?._id}`}>
              <ExternalLink className="mr-1 h-4 w-4" /> View
            </Link>
          </Button>

          <Button
            asChild
            variant="default"
            size="sm"
            className="text-xs px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white"
          >
            <Link
              href={project?.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="mr-1 h-4 w-4" /> Live
            </Link>
          </Button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default FeaturedProjectCard;
