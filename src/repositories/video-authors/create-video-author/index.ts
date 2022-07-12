import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateVideoAuthorDTO } from '@/dtos/video-authors/create-video-author.dto';
import { VideoAuthorMapper } from '@/mappers/video-authors';
import { VideoAuthorModel } from '@/models/video-author.model';

@Injectable()
export class CreateVideoAuthorRepository
  implements IBaseRepository<CreateVideoAuthorDTO, Promise<VideoAuthorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideoAuthorDTO): Promise<VideoAuthorModel> {
    return new VideoAuthorMapper().toModel(
      await this.model.videoAuthor.create({ data })
    );
  }
}
