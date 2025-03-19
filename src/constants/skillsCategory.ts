export const skillsCategories = [
  "Language",
  "Frontend",
  "Backend",
  "DevOps",
  "Tools",
] as const;

export const skillsCategoryOptions = skillsCategories.map((category) => ({
  value: category,
  label: category,
}));
