import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateFeatureDTO } from '@/dtos/features/create-feature.dto';
import { FeatureMapper } from '@/mappers/features';
import { FeatureModel } from '@/models/feature.model';

@Injectable()
export class CreateFeatureRepository
  implements IBaseRepository<CreateFeatureDTO, Promise<FeatureModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateFeatureDTO): Promise<FeatureModel> {
    return new FeatureMapper().toModel(
      await this.model.feature.create({ data })
    );
  }
}
