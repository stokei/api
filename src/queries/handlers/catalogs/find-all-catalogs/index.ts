import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CatalogMapper } from '@/mappers/catalogs';
import { CatalogModel } from '@/models/catalog.model';
import { FindAllCatalogsQuery } from '@/queries/implements/catalogs/find-all-catalogs.query';
import { CountCatalogsRepository } from '@/repositories/catalogs/count-catalogs';
import { FindAllCatalogsRepository } from '@/repositories/catalogs/find-all-catalogs';

@QueryHandler(FindAllCatalogsQuery)
export class FindAllCatalogsQueryHandler
  implements IQueryHandler<FindAllCatalogsQuery>
{
  constructor(
    private readonly findAllCatalogRepository: FindAllCatalogsRepository,
    private readonly countCatalogsRepository: CountCatalogsRepository
  ) {}

  async execute(
    query: FindAllCatalogsQuery
  ): Promise<IPaginatedType<CatalogModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CatalogMapper().toFindAllQueryClean(query);
    const catalogs = await this.findAllCatalogRepository.execute(data);
    const totalCount = await this.countCatalogsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CatalogModel>().toPaginationList({
      items: catalogs,
      page: data.page,
      totalCount
    });
  }
}
