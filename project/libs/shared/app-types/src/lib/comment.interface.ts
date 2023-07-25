import { User } from "./user.interface";

export interface Comment{
  _id?: string;
  text: string;
  author: User;
  createdAt: Date;
}
