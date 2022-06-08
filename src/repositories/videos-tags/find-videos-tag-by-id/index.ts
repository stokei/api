import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { VideosTagMapper } from '@/mappers/videos-tags';
import { VideosTagModel } from '@/models/videos-tag.model';

@Injectable()
export class FindVideosTagByIdRepository
  implements IBaseRepository<string, Promise<VideosTagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideosTagModel> {
    return new VideosTagMapper().toModel(
      await this.model.videosTag.findUnique({
        where: { id }
      })
    );
  }
}
