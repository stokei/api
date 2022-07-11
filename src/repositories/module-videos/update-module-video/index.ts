import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateModuleVideoDTO } from '@/dtos/module-videos/update-module-video.dto';

@Injectable()
export class UpdateModuleVideoRepository
  implements IBaseRepository<UpdateModuleVideoDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateModuleVideoDTO): Promise<boolean> {
    const updated = await this.model.moduleVideo.update({
      where: {
        id: where?.moduleVideoId
      },
      data
    });
    return !!updated;
  }
}
