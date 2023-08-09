import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
  _id?: string;
  text: string;
  userId: string;
  postId: number;
  createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {
      _id: this._id,
      text: this.text,
      userId: this.userId,
      postId: this.postId,
      createdAt: this.createdAt,
    };
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.userId = comment.userId;
    this.postId = comment.postId;
    this.createdAt = comment.createdAt;
  }
}