import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateVideosSubtitleDTO } from '@/dtos/videos-subtitles/update-videos-subtitle.dto';

@Injectable()
export class UpdateVideosSubtitleRepository
  implements IBaseRepository<UpdateVideosSubtitleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVideosSubtitleDTO): Promise<boolean> {
    const updated = await this.model.videosSubtitle.update({
      where: {
        id: where?.videosSubtitleId
      },
      data
    });
    return !!updated;
  }
}
