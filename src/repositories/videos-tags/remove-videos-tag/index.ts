import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveVideosTagDTO } from '@/dtos/videos-tags/remove-videos-tag.dto';

@Injectable()
export class RemoveVideosTagRepository
  implements IBaseRepository<RemoveVideosTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVideosTagDTO): Promise<boolean> {
    const removed = await this.model.videosTag.delete({
      where: {
        id: where?.videosTagId
      }
    });
    return !!removed;
  }
}
