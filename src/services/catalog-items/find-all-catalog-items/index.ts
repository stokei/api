import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCatalogItemsDTO } from '@/dtos/catalog-items/find-all-catalog-items.dto';
import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindAllCatalogItemsQuery } from '@/queries/implements/catalog-items/find-all-catalog-items.query';

@Injectable()
export class FindAllCatalogItemsService
  implements
    IBaseService<
      FindAllCatalogItemsDTO,
      Promise<IPaginatedType<CatalogItemModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCatalogItemsDTO
  ): Promise<IPaginatedType<CatalogItemModel>> {
    return await this.queryBus.execute(new FindAllCatalogItemsQuery(data));
  }
}
