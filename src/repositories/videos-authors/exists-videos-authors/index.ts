import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsVideosAuthorsDTO } from '@/dtos/videos-authors/exists-videos-authors.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsVideosAuthorsRepository
  implements IBaseRepository<ExistsVideosAuthorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVideosAuthorsDTO): Promise<boolean> {
    return (await this.model.videosAuthor.count({ where })) > 0;
  }
}
