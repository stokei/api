import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAllCatalogItemsByCatalogIdsDTO } from '@/dtos/catalog-items/find-all-catalog-items-by-catalog-ids.dto';
import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindAllCatalogItemsByCatalogIdsQuery } from '@/queries/implements/catalog-items/find-all-catalog-items-by-catalog-ids.query';

@Injectable()
export class FindAllCatalogItemsByCatalogIdsService
  implements
    IBaseService<
      FindAllCatalogItemsByCatalogIdsDTO,
      Promise<CatalogItemModel[]>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCatalogItemsByCatalogIdsDTO
  ): Promise<CatalogItemModel[]> {
    return await this.queryBus.execute(
      new FindAllCatalogItemsByCatalogIdsQuery(data)
    );
  }
}
