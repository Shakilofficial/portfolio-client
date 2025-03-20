import { PUser } from "./user";

export interface ITechnology {
  _id: string;
  name: string;
  icon: string;
}

export interface IProject {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  category: string;
  githubUrl: string;
  liveUrl: string;
  technologies: ITechnology[];
  isFeatured: boolean;
  createdBy: PUser;
  createdAt: string;
  updatedAt: string;
}
