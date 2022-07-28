import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountVideoAuthorsDTO } from '@/dtos/video-authors/count-video-authors.dto';
import { VideoAuthorMapper } from '@/mappers/video-authors';

@Injectable()
export class CountVideoAuthorsRepository
  implements IBaseRepository<CountVideoAuthorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountVideoAuthorsDTO): Promise<number> {
    const videoAuthorMapper = new VideoAuthorMapper();
    return await this.model.videoAuthor.count({
      where: videoAuthorMapper.toWhereFindAllPrisma(where)
    });
  }
}
