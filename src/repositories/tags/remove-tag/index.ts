import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveTagDTO } from '@/dtos/tags/remove-tag.dto';

@Injectable()
export class RemoveTagRepository
  implements IBaseRepository<RemoveTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveTagDTO): Promise<boolean> {
    const removed = await this.model.tag.delete({
      where: {
        id: where?.tagId
      }
    });
    return !!removed;
  }
}
