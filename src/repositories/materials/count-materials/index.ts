import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountMaterialsDTO } from '@/dtos/materials/count-materials.dto';
import { MaterialMapper } from '@/mappers/materials';

@Injectable()
export class CountMaterialsRepository
  implements IBaseRepository<CountMaterialsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountMaterialsDTO): Promise<number> {
    const materialMapper = new MaterialMapper();
    return await this.model.material.count({
      where: materialMapper.toWhereFindAllPrisma(where)
    });
  }
}
