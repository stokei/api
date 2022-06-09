import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveVideosMaterialDTO } from '@/dtos/videos-materials/remove-videos-material.dto';

@Injectable()
export class RemoveVideosMaterialRepository
  implements IBaseRepository<RemoveVideosMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveVideosMaterialDTO): Promise<boolean> {
    const removed = await this.model.videosMaterial.delete({
      where: {
        id: where?.videosMaterialId
      }
    });
    return !!removed;
  }
}
