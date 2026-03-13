import ManageSkills from "@/components/module/dashboard/skills/ManageSkills";
import { getAllSKills } from "@/services/skillService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Shakils Portfolio",
  description: "Manage your skills",
};

const SkillsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; searchTerm: string; category: string }>;
}) => {
  const { page, searchTerm, category } = await searchParams;
  const { data, meta } = await getAllSKills(page, "10", searchTerm, category);

  return (
    <div>
      <ManageSkills skills={data} meta={meta} />
    </div>
  );
};

export default SkillsPage;
