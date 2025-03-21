export interface TBlog {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  thumbnail: string;
  slug: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    name: string;
    profileImage: string;
  };
}
