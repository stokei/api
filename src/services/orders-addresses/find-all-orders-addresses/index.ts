import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { OrdersAddressModel } from '@/models/orders-address.model';
import { FindAllOrdersAddressesDTO } from '@/dtos/orders-addresses/find-all-orders-addresses.dto';
import { FindAllOrdersAddressesQuery } from '@/queries/implements/orders-addresses/find-all-orders-addresses.query';

@Injectable()
export class FindAllOrdersAddressesService
  implements
    IBaseService<
      FindAllOrdersAddressesDTO,
      Promise<IPaginatedType<OrdersAddressModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllOrdersAddressesDTO
  ): Promise<IPaginatedType<OrdersAddressModel>> {
    return await this.queryBus.execute(new FindAllOrdersAddressesQuery(data));
  }
}
