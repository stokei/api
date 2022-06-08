import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ModuleMapper } from '@/mappers/modules';
import { CreateModuleDTO } from '@/dtos/modules/create-module.dto';
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
