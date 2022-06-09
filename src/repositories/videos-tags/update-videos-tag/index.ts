import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateVideosTagDTO } from '@/dtos/videos-tags/update-videos-tag.dto';

@Injectable()
export class UpdateVideosTagRepository
  implements IBaseRepository<UpdateVideosTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVideosTagDTO): Promise<boolean> {
    const updated = await this.model.videosTag.update({
      where: {
        id: where?.videosTagId
      },
      data
    });
    return !!updated;
  }
}
