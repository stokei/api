import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsVideosTagsDTO } from '@/dtos/videos-tags/exists-videos-tags.dto';

@Injectable()
export class ExistsVideosTagsRepository
  implements IBaseRepository<ExistsVideosTagsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVideosTagsDTO): Promise<boolean> {
    return (await this.model.videosTag.count({ where })) > 0;
  }
}
