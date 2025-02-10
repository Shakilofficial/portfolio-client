export type TBlog = {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  author: {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    profileImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};
