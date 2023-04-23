import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { FeatureMapper } from '@/mappers/features';
import { FeatureModel } from '@/models/feature.model';
import { FindAllFeaturesQuery } from '@/queries/implements/features/find-all-features.query';
import { CountFeaturesRepository } from '@/repositories/features/count-features';
import { FindAllFeaturesRepository } from '@/repositories/features/find-all-features';

@QueryHandler(FindAllFeaturesQuery)
export class FindAllFeaturesQueryHandler
  implements IQueryHandler<FindAllFeaturesQuery>
{
  constructor(
    private readonly findAllFeatureRepository: FindAllFeaturesRepository,
    private readonly countFeaturesRepository: CountFeaturesRepository
  ) {}

  async execute(
    query: FindAllFeaturesQuery
  ): Promise<IPaginatedType<FeatureModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new FeatureMapper().toFindAllQueryClean(query);
    const features = await this.findAllFeatureRepository.execute(data);
    const totalCount = await this.countFeaturesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<FeatureModel>().toPaginationList({
      items: features,
      page: data.page,
      totalCount
    });
  }
}
