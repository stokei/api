import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { OrdersItemModel } from '@/models/orders-item.model';
import { FindAllOrdersItemsDTO } from '@/dtos/orders-items/find-all-orders-items.dto';
import { FindAllOrdersItemsQuery } from '@/queries/implements/orders-items/find-all-orders-items.query';

@Injectable()
export class FindAllOrdersItemsService
  implements
    IBaseService<
      FindAllOrdersItemsDTO,
      Promise<IPaginatedType<OrdersItemModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllOrdersItemsDTO
  ): Promise<IPaginatedType<OrdersItemModel>> {
    return await this.queryBus.execute(new FindAllOrdersItemsQuery(data));
  }
}
