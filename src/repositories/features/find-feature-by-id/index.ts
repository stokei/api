import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FeatureMapper } from '@/mappers/features';
import { FeatureModel } from '@/models/feature.model';

@Injectable()
export class FindFeatureByIdRepository
  implements IBaseRepository<string, Promise<FeatureModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<FeatureModel> {
    return new FeatureMapper().toModel(
      await this.model.feature.findUnique({
        where: { id }
      })
    );
  }
}
