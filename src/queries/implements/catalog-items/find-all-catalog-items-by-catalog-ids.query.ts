import { IQuery } from '@nestjs/cqrs';

import { FindAllCatalogItemsByCatalogIdsDTO } from '@/dtos/catalog-items/find-all-catalog-items-by-catalog-ids.dto';

export class FindAllCatalogItemsByCatalogIdsQuery
  implements IQuery, FindAllCatalogItemsByCatalogIdsDTO
{
  catalogs: string[];
  pageLimit: number;

  constructor(data: FindAllCatalogItemsByCatalogIdsDTO) {
    this.catalogs = data.catalogs;
    this.pageLimit = data.pageLimit;
  }
}
