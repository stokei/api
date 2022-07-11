import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { OrderItemModel } from '@/models/order-item.model';
import { FindOrderItemByIdQuery } from '@/queries/implements/order-items/find-order-item-by-id.query';

@Injectable()
export class FindOrderItemByIdService
  implements IBaseService<string, Promise<OrderItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<OrderItemModel> {
    return await this.queryBus.execute(new FindOrderItemByIdQuery(data));
  }
}
