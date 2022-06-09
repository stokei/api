import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCartsItemsDTO } from '@/dtos/carts-items/find-all-carts-items.dto';
import { CartsItemModel } from '@/models/carts-item.model';
import { FindAllCartsItemsQuery } from '@/queries/implements/carts-items/find-all-carts-items.query';

@Injectable()
export class FindAllCartsItemsService
  implements
    IBaseService<FindAllCartsItemsDTO, Promise<IPaginatedType<CartsItemModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCartsItemsDTO
  ): Promise<IPaginatedType<CartsItemModel>> {
    return await this.queryBus.execute(new FindAllCartsItemsQuery(data));
  }
}
