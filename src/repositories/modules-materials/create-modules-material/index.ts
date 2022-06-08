import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ModulesMaterialMapper } from '@/mappers/modules-materials';
import { CreateModulesMaterialDTO } from '@/dtos/modules-materials/create-modules-material.dto';
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
