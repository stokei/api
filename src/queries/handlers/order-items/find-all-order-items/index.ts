import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { OrderItemMapper } from '@/mappers/order-items';
import { OrderItemModel } from '@/models/order-item.model';
import { FindAllOrderItemsQuery } from '@/queries/implements/order-items/find-all-order-items.query';
import { CountOrderItemsRepository } from '@/repositories/order-items/count-order-items';
import { FindAllOrderItemsRepository } from '@/repositories/order-items/find-all-order-items';

@QueryHandler(FindAllOrderItemsQuery)
export class FindAllOrderItemsQueryHandler
  implements IQueryHandler<FindAllOrderItemsQuery>
{
  constructor(
    private readonly findAllOrderItemRepository: FindAllOrderItemsRepository,
    private readonly countOrderItemsRepository: CountOrderItemsRepository
  ) {}

  async execute(
    query: FindAllOrderItemsQuery
  ): Promise<IPaginatedType<OrderItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new OrderItemMapper().toFindAllQueryClean(query);
    const orderItems = await this.findAllOrderItemRepository.execute(data);
    const totalCount = await this.countOrderItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrderItemModel>().toPaginationList({
      items: orderItems,
      page: data.page,
      totalCount
    });
  }
}
