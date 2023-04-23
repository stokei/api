import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountFeaturesDTO } from '@/dtos/features/count-features.dto';
import { FeatureMapper } from '@/mappers/features';

@Injectable()
export class CountFeaturesRepository
  implements IBaseRepository<CountFeaturesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountFeaturesDTO): Promise<number> {
    const featureMapper = new FeatureMapper();
    return await this.model.feature.count({
      where: featureMapper.toWhereFindAllPrisma(where)
    });
  }
}
