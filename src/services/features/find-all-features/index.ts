import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllFeaturesDTO } from '@/dtos/features/find-all-features.dto';
import { FeatureModel } from '@/models/feature.model';
import { FindAllFeaturesQuery } from '@/queries/implements/features/find-all-features.query';

@Injectable()
export class FindAllFeaturesService
  implements
    IBaseService<FindAllFeaturesDTO, Promise<IPaginatedType<FeatureModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllFeaturesDTO
  ): Promise<IPaginatedType<FeatureModel>> {
    return await this.queryBus.execute(new FindAllFeaturesQuery(data));
  }
}
