import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllVideosDTO } from '@/dtos/videos/find-all-videos.dto';
import { VideoMapper } from '@/mappers/videos';
import { VideoModel } from '@/models/video.model';

@Injectable()
export class FindAllVideosRepository
  implements IBaseRepository<FindAllVideosDTO, Promise<VideoModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllVideosDTO): Promise<VideoModel[]> {
    const videoMapper = new VideoMapper();
    return videoMapper.toModels(
      await this.model.video.findMany(videoMapper.toFindAllPrisma(data))
    );
  }
}
