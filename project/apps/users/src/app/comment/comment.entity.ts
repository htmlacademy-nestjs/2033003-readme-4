import { User, Comment } from '@project/shared/app-types';

export class CommentEntity implements Comment {
  _id?: string;
  publicationId: string;
  text: string;
  authorId: string;
  createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {
      _id: this._id,
      publicationId: this.publicationId,
      text: this.text,
      authorId: this.authorId,
      createdAt: this.createdAt,
    };
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.publicationId = comment.publicationId;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.createdAt = comment.createdAt;
  }
}