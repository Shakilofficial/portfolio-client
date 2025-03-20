import { PUser } from "./user";

export interface IBlog {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
  thumbnail: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdBy: PUser;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
