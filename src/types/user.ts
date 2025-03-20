export interface IUser {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export interface PUser {
  _id: string;
  email: string;
  name: string;
}
