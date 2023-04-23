import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FeatureModel } from '@/models/feature.model';
import { FindFeatureByIdQuery } from '@/queries/implements/features/find-feature-by-id.query';

@Injectable()
export class FindFeatureByIdService
  implements IBaseService<string, Promise<FeatureModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<FeatureModel> {
    return await this.queryBus.execute(new FindFeatureByIdQuery(data));
  }
}
