import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CatalogModel } from '@/models/catalog.model';
import { FindCatalogByIdQuery } from '@/queries/implements/catalogs/find-catalog-by-id.query';

@Injectable()
export class FindCatalogByIdService
  implements IBaseService<string, Promise<CatalogModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CatalogModel> {
    return await this.queryBus.execute(new FindCatalogByIdQuery(data));
  }
}
