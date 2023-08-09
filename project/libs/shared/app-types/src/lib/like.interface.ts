import { Post } from '@prisma/client';
import { User } from "./user.interface";

export interface Like {
  id: string;
  user: User;
  publication: Post;
}
