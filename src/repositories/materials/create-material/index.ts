import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateMaterialDTO } from '@/dtos/materials/create-material.dto';
import { MaterialMapper } from '@/mappers/materials';
import { MaterialModel } from '@/models/material.model';

@Injectable()
export class CreateMaterialRepository
  implements IBaseRepository<CreateMaterialDTO, Promise<MaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateMaterialDTO): Promise<MaterialModel> {
    return new MaterialMapper().toModel(
      await this.model.material.create({ data })
    );
  }
}
