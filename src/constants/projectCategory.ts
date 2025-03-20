export const projectCategories = ["frontend", "backend", "fullstack"] as const;

export const projectCategoryOptions = projectCategories.map((category) => ({
  value: category,
  label: category,
}));
