export interface Comment{
  _id?: string;
  publicationId: string;
  text: string;
  authorId: string;
  createdAt?: Date;
}
