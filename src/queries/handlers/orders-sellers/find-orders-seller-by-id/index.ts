import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  OrdersSellerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrdersSellerModel } from '@/models/orders-seller.model';
import { FindOrdersSellerByIdRepository } from '@/repositories/orders-sellers/find-orders-seller-by-id';
import { FindOrdersSellerByIdQuery } from '@/queries/implements/orders-sellers/find-orders-seller-by-id.query';

@QueryHandler(FindOrdersSellerByIdQuery)
export class FindOrdersSellerByIdQueryHandler
  implements IQueryHandler<FindOrdersSellerByIdQuery>
{
  constructor(
    private readonly findOrdersSellerByIdRepository: FindOrdersSellerByIdRepository
  ) {}

  async execute(query: FindOrdersSellerByIdQuery): Promise<OrdersSellerModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const ordersSeller = await this.findOrdersSellerByIdRepository.execute(id);
    if (!ordersSeller) {
      throw new OrdersSellerNotFoundException();
    }
    return ordersSeller;
  }
}
