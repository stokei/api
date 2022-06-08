import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsVideosSubtitlesDTO } from '@/dtos/videos-subtitles/exists-videos-subtitles.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsVideosSubtitlesRepository
  implements IBaseRepository<ExistsVideosSubtitlesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsVideosSubtitlesDTO): Promise<boolean> {
    return (await this.model.videosSubtitle.count({ where })) > 0;
  }
}
