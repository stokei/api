import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllFeaturesDTO } from '@/dtos/features/find-all-features.dto';
import { FeatureMapper } from '@/mappers/features';
import { FeatureModel } from '@/models/feature.model';

@Injectable()
export class FindAllFeaturesRepository
  implements IBaseRepository<FindAllFeaturesDTO, Promise<FeatureModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllFeaturesDTO): Promise<FeatureModel[]> {
    const featureMapper = new FeatureMapper();
    return featureMapper.toModels(
      await this.model.feature.findMany(featureMapper.toFindAllPrisma(data))
    );
  }
}
