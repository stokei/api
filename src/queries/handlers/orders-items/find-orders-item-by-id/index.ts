import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  OrdersItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrdersItemModel } from '@/models/orders-item.model';
import { FindOrdersItemByIdQuery } from '@/queries/implements/orders-items/find-orders-item-by-id.query';
import { FindOrdersItemByIdRepository } from '@/repositories/orders-items/find-orders-item-by-id';

@QueryHandler(FindOrdersItemByIdQuery)
export class FindOrdersItemByIdQueryHandler
  implements IQueryHandler<FindOrdersItemByIdQuery>
{
  constructor(
    private readonly findOrdersItemByIdRepository: FindOrdersItemByIdRepository
  ) {}

  async execute(query: FindOrdersItemByIdQuery): Promise<OrdersItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const ordersItem = await this.findOrdersItemByIdRepository.execute(id);
    if (!ordersItem) {
      throw new OrdersItemNotFoundException();
    }
    return ordersItem;
  }
}
