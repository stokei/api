import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveVideoDTO } from '@/dtos/videos/remove-video.dto';

@Injectable()
export class RemoveVideoRepository
  implements IBaseRepository<RemoveVideoDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVideoDTO): Promise<boolean> {
    const removed = await this.model.video.delete({
      where: {
        id: where?.videoId
      }
    });
    return !!removed;
  }
}
