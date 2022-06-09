import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateVideosTagDTO } from '@/dtos/videos-tags/create-videos-tag.dto';
import { VideosTagMapper } from '@/mappers/videos-tags';
import { VideosTagModel } from '@/models/videos-tag.model';

@Injectable()
export class CreateVideosTagRepository
  implements IBaseRepository<CreateVideosTagDTO, Promise<VideosTagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideosTagDTO): Promise<VideosTagModel> {
    return new VideosTagMapper().toModel(
      await this.model.videosTag.create({ data })
    );
  }
}
