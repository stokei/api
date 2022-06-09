import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CategoryModel } from '@/models/category.model';
import { FindCategoryByIdQuery } from '@/queries/implements/categories/find-category-by-id.query';

@Injectable()
export class FindCategoryByIdService
  implements IBaseService<string, Promise<CategoryModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CategoryModel> {
    return await this.queryBus.execute(new FindCategoryByIdQuery(data));
  }
}
