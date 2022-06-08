import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  ProductsCategoryNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ProductsCategoryModel } from '@/models/products-category.model';
import { FindProductsCategoryByIdRepository } from '@/repositories/products-categories/find-products-category-by-id';
import { FindProductsCategoryByIdQuery } from '@/queries/implements/products-categories/find-products-category-by-id.query';

@QueryHandler(FindProductsCategoryByIdQuery)
export class FindProductsCategoryByIdQueryHandler
  implements IQueryHandler<FindProductsCategoryByIdQuery>
{
  constructor(
    private readonly findProductsCategoryByIdRepository: FindProductsCategoryByIdRepository
  ) {}

  async execute(
    query: FindProductsCategoryByIdQuery
  ): Promise<ProductsCategoryModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const productsCategory =
      await this.findProductsCategoryByIdRepository.execute(id);
    if (!productsCategory) {
      throw new ProductsCategoryNotFoundException();
    }
    return productsCategory;
  }
}
