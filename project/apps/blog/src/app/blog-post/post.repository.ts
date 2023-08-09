import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PostEntity } from './post.entity';
import { BasePublication, PublicationState, PublicationType } from '@project/shared/app-types';
import { PrismaService } from 'libs/models/blog-models/src/prisma/prisma.service'
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository implements CRUDRepository<PostEntity, number, BasePublication> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PostEntity): Promise<BasePublication> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: entityData.comments.map(comment => ({ commentId: comment.commentId })),
        }
      },
      include: {
        comments: true
      }
    });
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public async findById(postId: number): Promise<BasePublication | null> {
    const foundPost = await this.prisma.post.findFirst({
      where: {
        postId
      },
      include: {
        comments: true
      }
    });

    if (!foundPost) {
      return null;
    }
    const state = foundPost.state as PublicationState;
    const type = foundPost.type as PublicationType;
    const postEntity = new PostEntity({...foundPost, state: state, type: type});

    return postEntity;
  }

  public async find(): Promise<BasePublication[]> {
    const posts = await this.prisma.post.findMany();
    return posts.map(post => this.mapPrismaPostToBasePublication(post));
  }

  private mapPrismaPostToBasePublication(prismaPost): BasePublication {
    return {
      _id: prismaPost.postId.toString(),
      title: prismaPost.title,
      tags: prismaPost.tags,
      createdAt: prismaPost.createdAt,
      publishedAt: prismaPost.publishAt,
      state: prismaPost.state as PublicationState,
      userId: prismaPost.userId,
      type: prismaPost.type as PublicationType,
      videoLink: prismaPost.videoLink,
      excerpt: prismaPost.excerpt,
      content: prismaPost.content,
      quoteText: prismaPost.quoteText,
      photo: prismaPost.photo,
      url: prismaPost.url,
      description: prismaPost.description,
      comments: prismaPost.comments,
    };
  }

  public update(_id: number, _item: PostEntity): Promise<BasePublication> {
    return Promise.resolve(undefined);
  }
}
