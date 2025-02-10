export type TProject = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  category: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
