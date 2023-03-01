import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCatalogsDTO } from '@/dtos/catalogs/find-all-catalogs.dto';
import { CatalogModel } from '@/models/catalog.model';
import { FindAllCatalogsQuery } from '@/queries/implements/catalogs/find-all-catalogs.query';

@Injectable()
export class FindAllCatalogsService
  implements
    IBaseService<FindAllCatalogsDTO, Promise<IPaginatedType<CatalogModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCatalogsDTO
  ): Promise<IPaginatedType<CatalogModel>> {
    return await this.queryBus.execute(new FindAllCatalogsQuery(data));
  }
}
