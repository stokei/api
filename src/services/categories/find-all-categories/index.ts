import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { CategoryModel } from '@/models/category.model';
import { FindAllCategoriesDTO } from '@/dtos/categories/find-all-categories.dto';
import { FindAllCategoriesQuery } from '@/queries/implements/categories/find-all-categories.query';

@Injectable()
export class FindAllCategoriesService
  implements
    IBaseService<FindAllCategoriesDTO, Promise<IPaginatedType<CategoryModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCategoriesDTO
  ): Promise<IPaginatedType<CategoryModel>> {
    return await this.queryBus.execute(new FindAllCategoriesQuery(data));
  }
}
