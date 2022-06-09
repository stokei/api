import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ProductsCategoryModel } from '@/models/products-category.model';
import { FindProductsCategoryByIdQuery } from '@/queries/implements/products-categories/find-products-category-by-id.query';

@Injectable()
export class FindProductsCategoryByIdService
  implements IBaseService<string, Promise<ProductsCategoryModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ProductsCategoryModel> {
    return await this.queryBus.execute(new FindProductsCategoryByIdQuery(data));
  }
}
