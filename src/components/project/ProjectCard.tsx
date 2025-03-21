import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TProject } from "@/types/project.type";
import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface ProjectCardProps {
  project: TProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={project?.coverImage || "/placeholder.svg"}
            alt={project?.title || "Project Image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
            loading="eager"
            className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-purple-600/90 text-white text-xs font-medium px-2 py-1">
              {project?.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-5 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-background">
        <CardTitle className="mb-2 text-xl font-bold text-purple-700 dark:text-purple-300">
          {project?.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project?.subtitle}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 3).map((tech) => (
            <Badge
              key={tech._id}
              variant="secondary"
              className="flex items-center gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
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
              {tech.name}
            </Badge>
          ))}
          {project?.technologies?.length > 3 && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
            >
              +{project?.technologies?.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 border-t border-purple-100 dark:border-purple-800">
        <div className="flex justify-between w-full items-center gap-2 mt-2">
          {project?.githubUrl && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs px-2 py-1 text-purple-600 hover:text-purple-700 hover:bg-purple-100 
                dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/50"
            >
              <Link
                href={project?.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-1 h-3.5 w-3.5" />
                Repo
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-xs px-2 py-1 text-purple-600 hover:text-purple-700 hover:bg-purple-100 
              dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/50 dark:border-purple-700"
          >
            <Link href={`/projects/${project?._id}`}>
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              View
            </Link>
          </Button>

          {project?.liveUrl && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="text-xs px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link
                href={project?.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-1 h-3.5 w-3.5" />
                Live
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
