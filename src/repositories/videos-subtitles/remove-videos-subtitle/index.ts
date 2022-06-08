import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveVideosSubtitleDTO } from '@/dtos/videos-subtitles/remove-videos-subtitle.dto';

@Injectable()
export class RemoveVideosSubtitleRepository
  implements IBaseRepository<RemoveVideosSubtitleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVideosSubtitleDTO): Promise<boolean> {
    const removed = await this.model.videosSubtitle.delete({
      where: {
        id: where?.videosSubtitleId
      }
    });
    return !!removed;
  }
}
