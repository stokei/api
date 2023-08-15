import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { OrderMapper } from '@/mappers/orders';
import { OrderModel } from '@/models/order.model';
import { FindAllOrdersQuery } from '@/queries/implements/orders/find-all-orders.query';
import { CountOrdersRepository } from '@/repositories/orders/count-orders';
import { FindAllOrdersRepository } from '@/repositories/orders/find-all-orders';

@QueryHandler(FindAllOrdersQuery)
export class FindAllOrdersQueryHandler
  implements IQueryHandler<FindAllOrdersQuery>
{
  constructor(
    private readonly findAllOrderRepository: FindAllOrdersRepository,
    private readonly countOrdersRepository: CountOrdersRepository
  ) {}

  async execute(
    query: FindAllOrdersQuery
  ): Promise<IPaginatedType<OrderModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new OrderMapper().toFindAllQueryClean(query);
    const orders = await this.findAllOrderRepository.execute(data);
    const totalCount = await this.countOrdersRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrderModel>().toPaginationList({
      items: orders,
      page: data.page,
      totalCount
    });
  }
}
