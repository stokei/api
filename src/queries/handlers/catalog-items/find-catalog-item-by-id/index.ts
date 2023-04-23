import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CatalogItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindCatalogItemByIdQuery } from '@/queries/implements/catalog-items/find-catalog-item-by-id.query';
import { FindCatalogItemByIdRepository } from '@/repositories/catalog-items/find-catalog-item-by-id';

@QueryHandler(FindCatalogItemByIdQuery)
export class FindCatalogItemByIdQueryHandler
  implements IQueryHandler<FindCatalogItemByIdQuery>
{
  constructor(
    private readonly findCatalogItemByIdRepository: FindCatalogItemByIdRepository
  ) {}

  async execute(query: FindCatalogItemByIdQuery): Promise<CatalogItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const catalogItem = await this.findCatalogItemByIdRepository.execute(id);
    if (!catalogItem) {
      throw new CatalogItemNotFoundException();
    }
    return catalogItem;
  }
}
