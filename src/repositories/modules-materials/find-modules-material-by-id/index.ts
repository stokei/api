import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ModulesMaterialMapper } from '@/mappers/modules-materials';
import { ModulesMaterialModel } from '@/models/modules-material.model';

@Injectable()
export class FindModulesMaterialByIdRepository
  implements IBaseRepository<string, Promise<ModulesMaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ModulesMaterialModel> {
    return new ModulesMaterialMapper().toModel(
      await this.model.modulesMaterial.findUnique({
        where: { id }
      })
    );
  }
}
