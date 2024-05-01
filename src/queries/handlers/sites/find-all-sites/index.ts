import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SiteMapper } from '@/mappers/sites';
import { SiteModel } from '@/models/site.model';
import { FindAllSitesQuery } from '@/queries/implements/sites/find-all-sites.query';
import { CountSitesRepository } from '@/repositories/sites/count-sites';
import { FindAllSitesRepository } from '@/repositories/sites/find-all-sites';

@QueryHandler(FindAllSitesQuery)
export class FindAllSitesQueryHandler
  implements IQueryHandler<FindAllSitesQuery>
{
  constructor(
    private readonly findAllSiteRepository: FindAllSitesRepository,
    private readonly countSitesRepository: CountSitesRepository
  ) {}

  async execute(query: FindAllSitesQuery): Promise<IPaginatedType<SiteModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new SiteMapper().toFindAllQueryClean(query);
    const sites = await this.findAllSiteRepository.execute(data);
    const totalCount = await this.countSitesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SiteModel>().toPaginationList({
      items: sites,
      page: data.page,
      totalCount
    });
  }
}
