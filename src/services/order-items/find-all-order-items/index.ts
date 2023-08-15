import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllOrderItemsDTO } from '@/dtos/order-items/find-all-orderItems.dto';
import { OrderItemModel } from '@/models/order-item.model';
import { FindAllOrderItemsQuery } from '@/queries/implements/order-items/find-all-orderItems.query';

@Injectable()
export class FindAllOrderItemsService
  implements
    IBaseService<FindAllOrderItemsDTO, Promise<IPaginatedType<OrderItemModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllOrderItemsDTO
  ): Promise<IPaginatedType<OrderItemModel>> {
    return await this.queryBus.execute(new FindAllOrderItemsQuery(data));
  }
}
