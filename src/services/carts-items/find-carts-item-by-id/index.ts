import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CartsItemModel } from '@/models/carts-item.model';
import { FindCartsItemByIdQuery } from '@/queries/implements/carts-items/find-carts-item-by-id.query';

@Injectable()
export class FindCartsItemByIdService
  implements IBaseService<string, Promise<CartsItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CartsItemModel> {
    return await this.queryBus.execute(new FindCartsItemByIdQuery(data));
  }
}
