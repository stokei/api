import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateModulesVideoDTO } from '@/dtos/modules-videos/update-modules-video.dto';

@Injectable()
export class UpdateModulesVideoRepository
  implements IBaseRepository<UpdateModulesVideoDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateModulesVideoDTO): Promise<boolean> {
    const updated = await this.model.modulesVideo.update({
      where: {
        id: where?.modulesVideoId
      },
      data
    });
    return !!updated;
  }
}
