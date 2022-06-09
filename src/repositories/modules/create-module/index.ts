import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateModuleDTO } from '@/dtos/modules/create-module.dto';
import { ModuleMapper } from '@/mappers/modules';
import { ModuleModel } from '@/models/module.model';

@Injectable()
export class CreateModuleRepository
  implements IBaseRepository<CreateModuleDTO, Promise<ModuleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateModuleDTO): Promise<ModuleModel> {
    return new ModuleMapper().toModel(await this.model.module.create({ data }));
  }
}
