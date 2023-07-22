import { CRUDRepository } from '@project/util/util-types';
import { BasePublication, Comment } from '@project/shared/app-types';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './publication.entity';

@Injectable()
export class PublicationMemoryRepository implements CRUDRepository<PublicationEntity, string, BasePublication> {
  private repository: Record<string, BasePublication> = {};

  public async create(item: PublicationEntity): Promise<BasePublication> {
    const entry = { ...item.toObject(), _id: randomUUID() };
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<BasePublication> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findAll(): Promise<BasePublication[]> {
    return Object.values(this.repository);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: PublicationEntity): Promise<BasePublication> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }

}
