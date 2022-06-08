import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ModulesVideoMapper } from '@/mappers/modules-videos';
import { CreateModulesVideoDTO } from '@/dtos/modules-videos/create-modules-video.dto';
import { ModulesVideoModel } from '@/models/modules-video.model';

@Injectable()
export class CreateModulesVideoRepository
  implements IBaseRepository<CreateModulesVideoDTO, Promise<ModulesVideoModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateModulesVideoDTO): Promise<ModulesVideoModel> {
    return new ModulesVideoMapper().toModel(
      await this.model.modulesVideo.create({ data })
    );
  }
}
