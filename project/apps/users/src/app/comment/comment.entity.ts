import { User, Comment } from '@project/shared/app-types';

export class CommentEntity implements Comment {
  _id?: string;
  text: string;
  author: User;
  createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {
      _id: this._id,
      text: this.text,
      author: this.author,
      createdAt: this.createdAt,
    };
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.author = comment.author;
    this.createdAt = comment.createdAt;
  }
}