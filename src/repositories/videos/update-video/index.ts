import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateVideoDTO } from '@/dtos/videos/update-video.dto';

@Injectable()
export class UpdateVideoRepository
  implements IBaseRepository<UpdateVideoDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVideoDTO): Promise<boolean> {
    const updated = await this.model.video.update({
      where: {
        id: where?.video
      },
      data
    });
    return !!updated;
  }
}
