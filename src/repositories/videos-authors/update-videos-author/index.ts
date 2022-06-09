import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateVideosAuthorDTO } from '@/dtos/videos-authors/update-videos-author.dto';

@Injectable()
export class UpdateVideosAuthorRepository
  implements IBaseRepository<UpdateVideosAuthorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVideosAuthorDTO): Promise<boolean> {
    const updated = await this.model.videosAuthor.update({
      where: {
        id: where?.videosAuthorId
      },
      data
    });
    return !!updated;
  }
}
