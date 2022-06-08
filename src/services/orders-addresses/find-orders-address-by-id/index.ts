import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { OrdersAddressModel } from '@/models/orders-address.model';
import { FindOrdersAddressByIdQuery } from '@/queries/implements/orders-addresses/find-orders-address-by-id.query';

@Injectable()
export class FindOrdersAddressByIdService
  implements IBaseService<string, Promise<OrdersAddressModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<OrdersAddressModel> {
    return await this.queryBus.execute(new FindOrdersAddressByIdQuery(data));
  }
}
