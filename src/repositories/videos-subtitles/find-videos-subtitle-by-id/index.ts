import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { VideosSubtitleMapper } from '@/mappers/videos-subtitles';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

@Injectable()
export class FindVideosSubtitleByIdRepository
  implements IBaseRepository<string, Promise<VideosSubtitleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideosSubtitleModel> {
    return new VideosSubtitleMapper().toModel(
      await this.model.videosSubtitle.findUnique({
        where: { id }
      })
    );
  }
}
