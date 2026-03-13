import ManageExperience from "@/components/module/dashboard/experiences/ManageExperience";
import { getAllExperiences } from "@/services/experienceService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences | Shakils Portfolio",
  description: "Manage your experiences",
};

const ExperiencesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; searchTerm: string }>;
}) => {
  const { page, searchTerm } = await searchParams;
  const { data, meta } = await getAllExperiences(page, "10", searchTerm);

  return (
    <div>
      <ManageExperience experiences={data} meta={meta} />
    </div>
  );
};

export default ExperiencesPage;
