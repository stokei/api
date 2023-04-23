import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CatalogNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CatalogModel } from '@/models/catalog.model';
import { FindCatalogByIdQuery } from '@/queries/implements/catalogs/find-catalog-by-id.query';
import { FindCatalogByIdRepository } from '@/repositories/catalogs/find-catalog-by-id';

@QueryHandler(FindCatalogByIdQuery)
export class FindCatalogByIdQueryHandler
  implements IQueryHandler<FindCatalogByIdQuery>
{
  constructor(
    private readonly findCatalogByIdRepository: FindCatalogByIdRepository
  ) {}

  async execute(query: FindCatalogByIdQuery): Promise<CatalogModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const catalog = await this.findCatalogByIdRepository.execute(id);
    if (!catalog) {
      throw new CatalogNotFoundException();
    }
    return catalog;
  }
}
