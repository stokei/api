import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveModulesVideoDTO } from '@/dtos/modules-videos/remove-modules-video.dto';

@Injectable()
export class RemoveModulesVideoRepository
  implements IBaseRepository<RemoveModulesVideoDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveModulesVideoDTO): Promise<boolean> {
    const removed = await this.model.modulesVideo.delete({
      where: {
        id: where?.modulesVideoId
      }
    });
    return !!removed;
  }
}
