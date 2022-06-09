import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { VideosAuthorMapper } from '@/mappers/videos-authors';
import { VideosAuthorModel } from '@/models/videos-author.model';

@Injectable()
export class FindVideosAuthorByIdRepository
  implements IBaseRepository<string, Promise<VideosAuthorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideosAuthorModel> {
    return new VideosAuthorMapper().toModel(
      await this.model.videosAuthor.findUnique({
        where: { id }
      })
    );
  }
}
