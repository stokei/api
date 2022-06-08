import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  SiteNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { SiteModel } from '@/models/site.model';
import { FindSiteByIdRepository } from '@/repositories/sites/find-site-by-id';
import { FindSiteByIdQuery } from '@/queries/implements/sites/find-site-by-id.query';

@QueryHandler(FindSiteByIdQuery)
export class FindSiteByIdQueryHandler
  implements IQueryHandler<FindSiteByIdQuery>
{
  constructor(
    private readonly findSiteByIdRepository: FindSiteByIdRepository
  ) {}

  async execute(query: FindSiteByIdQuery): Promise<SiteModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const site = await this.findSiteByIdRepository.execute(id);
    if (!site) {
      throw new SiteNotFoundException();
    }
    return site;
  }
}
