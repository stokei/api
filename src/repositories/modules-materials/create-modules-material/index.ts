import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateModulesMaterialDTO } from '@/dtos/modules-materials/create-modules-material.dto';
import { ModulesMaterialMapper } from '@/mappers/modules-materials';
import { ModulesMaterialModel } from '@/models/modules-material.model';

@Injectable()
export class CreateModulesMaterialRepository
  implements
    IBaseRepository<CreateModulesMaterialDTO, Promise<ModulesMaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateModulesMaterialDTO): Promise<ModulesMaterialModel> {
    return new ModulesMaterialMapper().toModel(
      await this.model.modulesMaterial.create({ data })
    );
  }
}
