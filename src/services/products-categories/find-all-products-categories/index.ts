import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { ProductsCategoryModel } from '@/models/products-category.model';
import { FindAllProductsCategoriesDTO } from '@/dtos/products-categories/find-all-products-categories.dto';
import { FindAllProductsCategoriesQuery } from '@/queries/implements/products-categories/find-all-products-categories.query';

@Injectable()
export class FindAllProductsCategoriesService
  implements
    IBaseService<
      FindAllProductsCategoriesDTO,
      Promise<IPaginatedType<ProductsCategoryModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllProductsCategoriesDTO
  ): Promise<IPaginatedType<ProductsCategoryModel>> {
    return await this.queryBus.execute(
      new FindAllProductsCategoriesQuery(data)
    );
  }
}
