import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllOrdersDTO } from '@/dtos/orders/find-all-orders.dto';
import { OrderModel } from '@/models/order.model';
import { FindAllOrdersQuery } from '@/queries/implements/orders/find-all-orders.query';

@Injectable()
export class FindAllOrdersService
  implements
    IBaseService<FindAllOrdersDTO, Promise<IPaginatedType<OrderModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllOrdersDTO): Promise<IPaginatedType<OrderModel>> {
    return await this.queryBus.execute(new FindAllOrdersQuery(data));
  }
}
