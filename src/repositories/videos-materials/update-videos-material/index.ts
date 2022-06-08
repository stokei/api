import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateVideosMaterialDTO } from '@/dtos/videos-materials/update-videos-material.dto';

@Injectable()
export class UpdateVideosMaterialRepository
  implements IBaseRepository<UpdateVideosMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateVideosMaterialDTO): Promise<boolean> {
    const updated = await this.model.videosMaterial.update({
      where: {
        id: where?.videosMaterialId
      },
      data
    });
    return !!updated;
  }
}
