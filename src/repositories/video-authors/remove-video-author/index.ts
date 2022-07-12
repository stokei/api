import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveVideoAuthorDTO } from '@/dtos/video-authors/remove-video-author.dto';

@Injectable()
export class RemoveVideoAuthorRepository
  implements IBaseRepository<RemoveVideoAuthorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVideoAuthorDTO): Promise<boolean> {
    const removed = await this.model.videoAuthor.delete({
      where: {
        id: where?.videoAuthorId
      }
    });
    return !!removed;
  }
}
