import { Publication } from "./publication.interface";
import { User } from "./user.interface";

export interface Like {
  id: string;
  user: User;
  publication: Publication;
}
