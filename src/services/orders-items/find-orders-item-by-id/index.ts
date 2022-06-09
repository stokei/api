import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { OrdersItemModel } from '@/models/orders-item.model';
import { FindOrdersItemByIdQuery } from '@/queries/implements/orders-items/find-orders-item-by-id.query';

@Injectable()
export class FindOrdersItemByIdService
  implements IBaseService<string, Promise<OrdersItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<OrdersItemModel> {
    return await this.queryBus.execute(new FindOrdersItemByIdQuery(data));
  }
}
