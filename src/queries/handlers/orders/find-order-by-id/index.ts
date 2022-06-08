import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  OrderNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrderModel } from '@/models/order.model';
import { FindOrderByIdRepository } from '@/repositories/orders/find-order-by-id';
import { FindOrderByIdQuery } from '@/queries/implements/orders/find-order-by-id.query';

@QueryHandler(FindOrderByIdQuery)
export class FindOrderByIdQueryHandler
  implements IQueryHandler<FindOrderByIdQuery>
{
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository
  ) {}

  async execute(query: FindOrderByIdQuery): Promise<OrderModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const order = await this.findOrderByIdRepository.execute(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    return order;
  }
}
