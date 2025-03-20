export enum BlogCategory {
  WebDevelopment = "Web Development",
  FrontendDevelopment = "Frontend Development",
  BackendDevelopment = "Backend Development",
  ProgrammingTips = "Programming Tips",
  TechTutorials = "Tech Tutorials",
  CareerDevelopment = "Career Development",
  ProjectShowcases = "Project Showcases",
  ToolsAndResources = "Tools & Resources",
  DevOpsAndDeployment = "DevOps & Deployment",
  IndustryNews = "Industry News",
}

export const blogCategories = Object.values(BlogCategory) as BlogCategory[];

export const blogCategoryOptions = blogCategories.map((category) => ({
  value: category,
  label: category,
}));
