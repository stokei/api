import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  OrdersAddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrdersAddressModel } from '@/models/orders-address.model';
import { FindOrdersAddressByIdRepository } from '@/repositories/orders-addresses/find-orders-address-by-id';
import { FindOrdersAddressByIdQuery } from '@/queries/implements/orders-addresses/find-orders-address-by-id.query';

@QueryHandler(FindOrdersAddressByIdQuery)
export class FindOrdersAddressByIdQueryHandler
  implements IQueryHandler<FindOrdersAddressByIdQuery>
{
  constructor(
    private readonly findOrdersAddressByIdRepository: FindOrdersAddressByIdRepository
  ) {}

  async execute(
    query: FindOrdersAddressByIdQuery
  ): Promise<OrdersAddressModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const ordersAddress = await this.findOrdersAddressByIdRepository.execute(
      id
    );
    if (!ordersAddress) {
      throw new OrdersAddressNotFoundException();
    }
    return ordersAddress;
  }
}
