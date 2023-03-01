import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CatalogItemMapper } from '@/mappers/catalog-items';
import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindAllCatalogItemsQuery } from '@/queries/implements/catalog-items/find-all-catalog-items.query';
import { CountCatalogItemsRepository } from '@/repositories/catalog-items/count-catalog-items';
import { FindAllCatalogItemsRepository } from '@/repositories/catalog-items/find-all-catalog-items';

@QueryHandler(FindAllCatalogItemsQuery)
export class FindAllCatalogItemsQueryHandler
  implements IQueryHandler<FindAllCatalogItemsQuery>
{
  constructor(
    private readonly findAllCatalogItemRepository: FindAllCatalogItemsRepository,
    private readonly countCatalogItemsRepository: CountCatalogItemsRepository
  ) {}

  async execute(
    query: FindAllCatalogItemsQuery
  ): Promise<IPaginatedType<CatalogItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CatalogItemMapper().toFindAllQueryClean(query);
    const catalogItems = await this.findAllCatalogItemRepository.execute(data);
    const totalCount = await this.countCatalogItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CatalogItemModel>().toPaginationList({
      items: catalogItems,
      page: data.page,
      totalCount
    });
  }
}
