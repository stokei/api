import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { VideoMapper } from '@/mappers/videos';
import { VideoModel } from '@/models/video.model';

@Injectable()
export class FindVideoByIdRepository
  implements IBaseRepository<string, Promise<VideoModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideoModel> {
    return new VideoMapper().toModel(
      await this.model.video.findUnique({
        where: { id }
      })
    );
  }
}
