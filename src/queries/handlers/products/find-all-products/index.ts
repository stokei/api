import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IPaginatedType,
  PaginationMapper,
  splitServiceId
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
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

    const data = this.clearData(query);
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

  private clearData(query: FindAllProductsQuery): FindAllProductsQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          name: cleanWhereDataSearch(operatorData.name),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}
