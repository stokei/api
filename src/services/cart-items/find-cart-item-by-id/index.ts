import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CartItemModel } from '@/models/cart-item.model';
import { FindCartItemByIdQuery } from '@/queries/implements/cart-items/find-cart-item-by-id.query';

@Injectable()
export class FindCartItemByIdService
  implements IBaseService<string, Promise<CartItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CartItemModel> {
    return await this.queryBus.execute(new FindCartItemByIdQuery(data));
  }
}
