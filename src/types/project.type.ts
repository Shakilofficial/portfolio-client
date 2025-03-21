export interface TProject {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  coverImage: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured: boolean;
  technologies: {
    _id: string;
    name: string;
    icon?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}

export const CATEGORY_OPTIONS = ["frontend", "backend", "fullstack"] as const;

export const categoryOptions = CATEGORY_OPTIONS.map((cat) => ({
  value: cat,
  label: cat,
}));
