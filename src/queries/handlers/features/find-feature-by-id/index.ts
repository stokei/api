import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  FeatureNotFoundException
} from '@/errors';
import { FeatureModel } from '@/models/feature.model';
import { FindFeatureByIdQuery } from '@/queries/implements/features/find-feature-by-id.query';
import { FindFeatureByIdRepository } from '@/repositories/features/find-feature-by-id';

@QueryHandler(FindFeatureByIdQuery)
export class FindFeatureByIdQueryHandler
  implements IQueryHandler<FindFeatureByIdQuery>
{
  constructor(
    private readonly findFeatureByIdRepository: FindFeatureByIdRepository
  ) {}

  async execute(query: FindFeatureByIdQuery): Promise<FeatureModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const feature = await this.findFeatureByIdRepository.execute(id);
    if (!feature) {
      throw new FeatureNotFoundException();
    }
    return feature;
  }
}
