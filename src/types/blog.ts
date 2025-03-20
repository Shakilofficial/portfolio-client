export interface ICreatedBy {
  _id: string;
  name: string;
  profileImage: string;
}

export interface IBlog {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
  thumbnail: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdBy: ICreatedBy;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
