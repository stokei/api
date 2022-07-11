import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  OrderItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrderItemModel } from '@/models/order-item.model';
import { FindOrderItemByIdQuery } from '@/queries/implements/order-items/find-order-item-by-id.query';
import { FindOrderItemByIdRepository } from '@/repositories/order-items/find-order-item-by-id';

@QueryHandler(FindOrderItemByIdQuery)
export class FindOrderItemByIdQueryHandler
  implements IQueryHandler<FindOrderItemByIdQuery>
{
  constructor(
    private readonly findOrderItemByIdRepository: FindOrderItemByIdRepository
  ) {}

  async execute(query: FindOrderItemByIdQuery): Promise<OrderItemModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const orderItem = await this.findOrderItemByIdRepository.execute(id);
    if (!orderItem) {
      throw new OrderItemNotFoundException();
    }
    return orderItem;
  }
}
