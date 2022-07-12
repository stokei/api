import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CartItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CartItemModel } from '@/models/cart-item.model';
import { FindCartItemByIdQuery } from '@/queries/implements/cart-items/find-cart-item-by-id.query';
import { FindCartItemByIdRepository } from '@/repositories/cart-items/find-cart-item-by-id';

@QueryHandler(FindCartItemByIdQuery)
export class FindCartItemByIdQueryHandler
  implements IQueryHandler<FindCartItemByIdQuery>
{
  constructor(
    private readonly findCartItemByIdRepository: FindCartItemByIdRepository
  ) {}

  async execute(query: FindCartItemByIdQuery): Promise<CartItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const cartItem = await this.findCartItemByIdRepository.execute(id);
    if (!cartItem) {
      throw new CartItemNotFoundException();
    }
    return cartItem;
  }
}
