import ManageProjects from "@/components/module/dashboard/projects/ManageProjects";
import { getAllProjects } from "@/services/projectService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Shakils Portfolio",
  description: "Manage your projects",
};

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllProjects(page);

  return (
    <div>
      <ManageProjects projects={data} meta={meta} />
    </div>
  );
};

export default ProjectsPage;
