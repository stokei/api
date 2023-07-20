import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllMaterialsDTO } from '@/dtos/materials/find-all-materials.dto';
import { MaterialMapper } from '@/mappers/materials';
import { MaterialModel } from '@/models/material.model';

@Injectable()
export class FindAllMaterialsRepository
  implements IBaseRepository<FindAllMaterialsDTO, Promise<MaterialModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllMaterialsDTO): Promise<MaterialModel[]> {
    const materialMapper = new MaterialMapper();
    return materialMapper.toModels(
      await this.model.material.findMany(materialMapper.toFindAllPrisma(data))
    );
  }
}
