import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllProductComboItemsDTO } from '@/dtos/product-combo-items/find-all-product-combo-items.dto';
import { ProductComboItemModel } from '@/models/product-combo-item.model';
import { FindAllProductComboItemsQuery } from '@/queries/implements/product-combo-items/find-all-product-combo-items.query';

@Injectable()
export class FindAllProductComboItemsService
  implements
    IBaseService<
      FindAllProductComboItemsDTO,
      Promise<IPaginatedType<ProductComboItemModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProductComboItemsDTO
  ): Promise<IPaginatedType<ProductComboItemModel>> {
    return await this.queryBus.execute(new FindAllProductComboItemsQuery(data));
  }
}
