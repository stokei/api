import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveVideosAuthorDTO } from '@/dtos/videos-authors/remove-videos-author.dto';

@Injectable()
export class RemoveVideosAuthorRepository
  implements IBaseRepository<RemoveVideosAuthorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVideosAuthorDTO): Promise<boolean> {
    const removed = await this.model.videosAuthor.delete({
      where: {
        id: where?.videosAuthorId
      }
    });
    return !!removed;
  }
}
