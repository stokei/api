import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateVideosSubtitleDTO } from '@/dtos/videos-subtitles/create-videos-subtitle.dto';
import { VideosSubtitleMapper } from '@/mappers/videos-subtitles';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

@Injectable()
export class CreateVideosSubtitleRepository
  implements
    IBaseRepository<CreateVideosSubtitleDTO, Promise<VideosSubtitleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideosSubtitleDTO): Promise<VideosSubtitleModel> {
    return new VideosSubtitleMapper().toModel(
      await this.model.videosSubtitle.create({ data })
    );
  }
}
