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
  searchParams: Promise<{ page: string; searchTerm: string; category: string }>;
}) => {
  const { page, searchTerm, category } = await searchParams;
  const { data, meta } = await getAllProjects(page, "10", searchTerm, category);

  return (
    <div>
      <ManageProjects projects={data} meta={meta} />
    </div>
  );
};

export default ProjectsPage;
