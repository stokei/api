import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCartsDTO } from '@/dtos/carts/find-all-carts.dto';
import { CartModel } from '@/models/cart.model';
import { FindAllCartsQuery } from '@/queries/implements/carts/find-all-carts.query';

@Injectable()
export class FindAllCartsService
  implements IBaseService<FindAllCartsDTO, Promise<IPaginatedType<CartModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllCartsDTO): Promise<IPaginatedType<CartModel>> {
    return await this.queryBus.execute(new FindAllCartsQuery(data));
  }
}
