import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CartModel } from '@/models/cart.model';
import { FindCartByIdQuery } from '@/queries/implements/carts/find-cart-by-id.query';

@Injectable()
export class FindCartByIdService
  implements IBaseService<string, Promise<CartModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CartModel> {
    return await this.queryBus.execute(new FindCartByIdQuery(data));
  }
}
