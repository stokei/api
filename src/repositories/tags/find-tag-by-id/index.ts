import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { TagMapper } from '@/mappers/tags';
import { TagModel } from '@/models/tag.model';

@Injectable()
export class FindTagByIdRepository
  implements IBaseRepository<string, Promise<TagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<TagModel> {
    return new TagMapper().toModel(
      await this.model.tag.findUnique({
        where: { id }
      })
    );
  }
}
