import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ProductComboItemModel } from '@/models/product-combo-item.model';
import { FindProductComboItemByIdQuery } from '@/queries/implements/product-combo-items/find-product-combo-item-by-id.query';

@Injectable()
export class FindProductComboItemByIdService
  implements IBaseService<string, Promise<ProductComboItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProductComboItemModel> {
    return await this.queryBus.execute(new FindProductComboItemByIdQuery(data));
  }
}
