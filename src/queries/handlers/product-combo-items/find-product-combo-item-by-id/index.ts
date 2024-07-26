import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  ProductComboItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ProductComboItemModel } from '@/models/product-combo-item.model';
import { FindProductComboItemByIdQuery } from '@/queries/implements/product-combo-items/find-product-combo-item-by-id.query';
import { FindProductComboItemByIdRepository } from '@/repositories/product-combo-items/find-product-combo-item-by-id';

@QueryHandler(FindProductComboItemByIdQuery)
export class FindProductComboItemByIdQueryHandler
  implements IQueryHandler<FindProductComboItemByIdQuery>
{
  constructor(
    private readonly findProductComboItemByIdRepository: FindProductComboItemByIdRepository
  ) {}

  async execute(
    query: FindProductComboItemByIdQuery
  ): Promise<ProductComboItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const productComboItem =
      await this.findProductComboItemByIdRepository.execute(id);
    if (!productComboItem) {
      throw new ProductComboItemNotFoundException();
    }
    return productComboItem;
  }
}
