import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCartItemsDTO } from '@/dtos/cart-items/find-all-cart-items.dto';
import { CartItemModel } from '@/models/cart-item.model';
import { FindAllCartItemsQuery } from '@/queries/implements/cart-items/find-all-cart-items.query';

@Injectable()
export class FindAllCartItemsService
  implements
    IBaseService<FindAllCartItemsDTO, Promise<IPaginatedType<CartItemModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCartItemsDTO
  ): Promise<IPaginatedType<CartItemModel>> {
    return await this.queryBus.execute(new FindAllCartItemsQuery(data));
  }
}
