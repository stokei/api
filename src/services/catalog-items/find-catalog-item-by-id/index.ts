import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindCatalogItemByIdQuery } from '@/queries/implements/catalog-items/find-catalog-item-by-id.query';

@Injectable()
export class FindCatalogItemByIdService
  implements IBaseService<string, Promise<CatalogItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CatalogItemModel> {
    return await this.queryBus.execute(new FindCatalogItemByIdQuery(data));
  }
}
