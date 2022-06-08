import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { VideosAuthorMapper } from '@/mappers/videos-authors';
import { CreateVideosAuthorDTO } from '@/dtos/videos-authors/create-videos-author.dto';
import { VideosAuthorModel } from '@/models/videos-author.model';

@Injectable()
export class CreateVideosAuthorRepository
  implements IBaseRepository<CreateVideosAuthorDTO, Promise<VideosAuthorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideosAuthorDTO): Promise<VideosAuthorModel> {
    return new VideosAuthorMapper().toModel(
      await this.model.videosAuthor.create({ data })
    );
  }
}
