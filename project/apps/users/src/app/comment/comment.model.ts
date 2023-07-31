import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment, User } from '@project/shared/app-types';
import { COMMENT_TEXT_MAX_LENGTH, COMMENT_TEXT_MIN_LENGTH } from './comment.constant';

@Schema({
  collection: 'comments',
  timestamps: true,
})
export class CommentModel extends Document implements Comment{
  @Prop({
    required: true
  })
  publicationId: string;

  @Prop({
    required: true,
    minlength: COMMENT_TEXT_MIN_LENGTH,
    maxlength:COMMENT_TEXT_MAX_LENGTH
  })
  text: string;

  @Prop({
    required: true
  })
  authorId: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
