import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { VideosMaterialMapper } from '@/mappers/videos-materials';
import { VideosMaterialModel } from '@/models/videos-material.model';

@Injectable()
export class FindVideosMaterialByIdRepository
  implements IBaseRepository<string, Promise<VideosMaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<VideosMaterialModel> {
    return new VideosMaterialMapper().toModel(
      await this.model.videosMaterial.findUnique({
        where: { id }
      })
    );
  }
}
