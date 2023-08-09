import { User } from "./user.interface";

export interface Comment{
  commentId?: number;
  text: string;
  postId?: number;
  userId: string;
  createdAt: Date;
}
