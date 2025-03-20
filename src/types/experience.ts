export interface IExperience {
  _id: string;
  title: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
