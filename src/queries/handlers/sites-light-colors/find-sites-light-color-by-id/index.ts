import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SitesLightColorNotFoundException
} from '@/errors';
import { SitesLightColorModel } from '@/models/sites-light-color.model';
import { FindSitesLightColorByIdQuery } from '@/queries/implements/sites-light-colors/find-sites-light-color-by-id.query';
import { FindSitesLightColorByIdRepository } from '@/repositories/sites-light-colors/find-sites-light-color-by-id';

@QueryHandler(FindSitesLightColorByIdQuery)
export class FindSitesLightColorByIdQueryHandler
  implements IQueryHandler<FindSitesLightColorByIdQuery>
{
  constructor(
    private readonly findSitesLightColorByIdRepository: FindSitesLightColorByIdRepository
  ) {}

  async execute(
    query: FindSitesLightColorByIdQuery
  ): Promise<SitesLightColorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const sitesLightColor =
      await this.findSitesLightColorByIdRepository.execute(id);
    if (!sitesLightColor) {
      throw new SitesLightColorNotFoundException();
    }
    return sitesLightColor;
  }
}
