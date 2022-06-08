import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CartNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CartModel } from '@/models/cart.model';
import { FindCartByIdRepository } from '@/repositories/carts/find-cart-by-id';
import { FindCartByIdQuery } from '@/queries/implements/carts/find-cart-by-id.query';

@QueryHandler(FindCartByIdQuery)
export class FindCartByIdQueryHandler
  implements IQueryHandler<FindCartByIdQuery>
{
  constructor(
    private readonly findCartByIdRepository: FindCartByIdRepository
  ) {}

  async execute(query: FindCartByIdQuery): Promise<CartModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const cart = await this.findCartByIdRepository.execute(id);
    if (!cart) {
      throw new CartNotFoundException();
    }
    return cart;
  }
}
