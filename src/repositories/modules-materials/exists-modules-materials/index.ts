import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsModulesMaterialsDTO } from '@/dtos/modules-materials/exists-modules-materials.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsModulesMaterialsRepository
  implements IBaseRepository<ExistsModulesMaterialsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsModulesMaterialsDTO): Promise<boolean> {
    return (await this.model.modulesMaterial.count({ where })) > 0;
  }
}
