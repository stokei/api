import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { OrderModel } from '@/models/order.model';
import { FindOrderByIdQuery } from '@/queries/implements/orders/find-order-by-id.query';

@Injectable()
export class FindOrderByIdService
  implements IBaseService<string, Promise<OrderModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<OrderModel> {
    return await this.queryBus.execute(new FindOrderByIdQuery(data));
  }
}
