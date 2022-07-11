import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveModuleVideoDTO } from '@/dtos/module-videos/remove-module-video.dto';

@Injectable()
export class RemoveModuleVideoRepository
  implements IBaseRepository<RemoveModuleVideoDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveModuleVideoDTO): Promise<boolean> {
    const removed = await this.model.moduleVideo.delete({
      where: {
        id: where?.moduleVideoId
      }
    });
    return !!removed;
  }
}
