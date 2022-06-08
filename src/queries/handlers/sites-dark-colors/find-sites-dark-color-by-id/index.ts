import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  SitesDarkColorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';
import { FindSitesDarkColorByIdRepository } from '@/repositories/sites-dark-colors/find-sites-dark-color-by-id';
import { FindSitesDarkColorByIdQuery } from '@/queries/implements/sites-dark-colors/find-sites-dark-color-by-id.query';

@QueryHandler(FindSitesDarkColorByIdQuery)
export class FindSitesDarkColorByIdQueryHandler
  implements IQueryHandler<FindSitesDarkColorByIdQuery>
{
  constructor(
    private readonly findSitesDarkColorByIdRepository: FindSitesDarkColorByIdRepository
  ) {}

  async execute(
    query: FindSitesDarkColorByIdQuery
  ): Promise<SitesDarkColorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const sitesDarkColor = await this.findSitesDarkColorByIdRepository.execute(
      id
    );
    if (!sitesDarkColor) {
      throw new SitesDarkColorNotFoundException();
    }
    return sitesDarkColor;
  }
}
