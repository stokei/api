import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CartItemMapper } from '@/mappers/cart-items';
import { CartItemModel } from '@/models/cart-item.model';
import { FindAllCartItemsQuery } from '@/queries/implements/cart-items/find-all-cart-items.query';
import { CountCartItemsRepository } from '@/repositories/cart-items/count-cart-items';
import { FindAllCartItemsRepository } from '@/repositories/cart-items/find-all-cart-items';

@QueryHandler(FindAllCartItemsQuery)
export class FindAllCartItemsQueryHandler
  implements IQueryHandler<FindAllCartItemsQuery>
{
  constructor(
    private readonly findAllCartItemRepository: FindAllCartItemsRepository,
    private readonly countCartItemsRepository: CountCartItemsRepository
  ) {}

  async execute(
    query: FindAllCartItemsQuery
  ): Promise<IPaginatedType<CartItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CartItemMapper().toFindAllQueryClean(query);
    const cartItems = await this.findAllCartItemRepository.execute(data);
    const totalCount = await this.countCartItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CartItemModel>().toPaginationList({
      items: cartItems,
      page: data.page,
      totalCount
    });
  }
}
