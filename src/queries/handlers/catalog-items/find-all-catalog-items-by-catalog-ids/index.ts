import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValueNumber,
  cleanValueOrValues
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindAllCatalogItemsByCatalogIdsQuery } from '@/queries/implements/catalog-items/find-all-catalog-items-by-catalog-ids.query';
import { FindAllCatalogItemsByCatalogIdsRepository } from '@/repositories/catalog-items/find-all-catalog-items-by-catalog-ids';

@QueryHandler(FindAllCatalogItemsByCatalogIdsQuery)
export class FindAllCatalogItemsByCatalogIdsQueryHandler
  implements IQueryHandler<FindAllCatalogItemsByCatalogIdsQuery>
{
  constructor(
    private readonly findAllCatalogItemsByCatalogIdsRepository: FindAllCatalogItemsByCatalogIdsRepository
  ) {}

  async execute(
    query: FindAllCatalogItemsByCatalogIdsQuery
  ): Promise<CatalogItemModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }
    const data = this.clearData(query);
    return this.findAllCatalogItemsByCatalogIdsRepository.execute(data);
  }

  private clearData(
    query: FindAllCatalogItemsByCatalogIdsQuery
  ): FindAllCatalogItemsByCatalogIdsQuery {
    return cleanObject({
      catalogs: cleanValueOrValues(query?.catalogs),
      pageLimit: cleanValueNumber(query?.pageLimit)
    });
  }
}
