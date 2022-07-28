import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllVideoAuthorsDTO } from '@/dtos/video-authors/find-all-video-authors.dto';
import { VideoAuthorMapper } from '@/mappers/video-authors';
import { VideoAuthorModel } from '@/models/video-author.model';

@Injectable()
export class FindAllVideoAuthorsRepository
  implements
    IBaseRepository<FindAllVideoAuthorsDTO, Promise<VideoAuthorModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllVideoAuthorsDTO): Promise<VideoAuthorModel[]> {
    const videoAuthorMapper = new VideoAuthorMapper();
    return videoAuthorMapper.toModels(
      await this.model.videoAuthor.findMany(
        videoAuthorMapper.toFindAllPrisma(data)
      )
    );
  }
}
