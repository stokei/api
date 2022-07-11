import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateModuleVideoDTO } from '@/dtos/module-videos/create-module-video.dto';
import { ModuleVideoMapper } from '@/mappers/module-videos';
import { ModuleVideoModel } from '@/models/module-video.model';

@Injectable()
export class CreateModuleVideoRepository
  implements IBaseRepository<CreateModuleVideoDTO, Promise<ModuleVideoModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateModuleVideoDTO): Promise<ModuleVideoModel> {
    return new ModuleVideoMapper().toModel(
      await this.model.moduleVideo.create({ data })
    );
  }
}
