import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateVideoAuthorDTO } from '@/dtos/video-authors/update-video-author.dto';

@Injectable()
export class UpdateVideoAuthorRepository
  implements IBaseRepository<UpdateVideoAuthorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVideoAuthorDTO): Promise<boolean> {
    const updated = await this.model.videoAuthor.update({
      where: {
        id: where?.videoAuthorId
      },
      data
    });
    return !!updated;
  }
}
