import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ProductsTagModel } from '@/models/products-tag.model';
import { FindProductsTagByIdQuery } from '@/queries/implements/products-tags/find-products-tag-by-id.query';

@Injectable()
export class FindProductsTagByIdService
  implements IBaseService<string, Promise<ProductsTagModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProductsTagModel> {
    return await this.queryBus.execute(new FindProductsTagByIdQuery(data));
  }
}
