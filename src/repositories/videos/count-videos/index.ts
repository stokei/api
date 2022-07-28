import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountVideosDTO } from '@/dtos/videos/count-videos.dto';
import { VideoMapper } from '@/mappers/videos';

@Injectable()
export class CountVideosRepository
  implements IBaseRepository<CountVideosDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountVideosDTO): Promise<number> {
    const videoMapper = new VideoMapper();
    return await this.model.video.count({
      where: videoMapper.toWhereFindAllPrisma(where)
    });
  }
}
