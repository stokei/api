import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ProductMapper } from '@/mappers/products';
import { ProductModel } from '@/models/product.model';
import { FindAllProductsQuery } from '@/queries/implements/products/find-all-products.query';
import { CountProductsRepository } from '@/repositories/products/count-products';
import { FindAllProductsRepository } from '@/repositories/products/find-all-products';

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsQueryHandler
  implements IQueryHandler<FindAllProductsQuery>
{
  constructor(
    private readonly findAllProductRepository: FindAllProductsRepository,
    private readonly countProductsRepository: CountProductsRepository
  ) {}

  async execute(
    query: FindAllProductsQuery
  ): Promise<IPaginatedType<ProductModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new ProductMapper().toFindAllQueryClean(query);
    const products = await this.findAllProductRepository.execute(data);
    const totalCount = await this.countProductsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProductModel>().toPaginationList({
      items: products,
      page: data.page,
      totalCount
    });
  }
}
