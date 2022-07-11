import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { VideoAuthorMapper } from '@/mappers/video-authors';
import { VideoAuthorModel } from '@/models/video-author.model';

@Injectable()
export class FindVideoAuthorByIdRepository
  implements IBaseRepository<string, Promise<VideoAuthorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideoAuthorModel> {
    return new VideoAuthorMapper().toModel(
      await this.model.videoAuthor.findUnique({
        where: { id }
      })
    );
  }
}
