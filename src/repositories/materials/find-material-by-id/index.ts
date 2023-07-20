import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { MaterialMapper } from '@/mappers/materials';
import { MaterialModel } from '@/models/material.model';

@Injectable()
export class FindMaterialByIdRepository
  implements IBaseRepository<string, Promise<MaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<MaterialModel> {
    return new MaterialMapper().toModel(
      await this.model.material.findUnique({
        where: { id }
      })
    );
  }
}
