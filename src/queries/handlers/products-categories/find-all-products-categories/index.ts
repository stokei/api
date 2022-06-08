import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IOperator,
  IPaginatedType,
  PaginationMapper,
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataString,
  cleanWhereDataSearch,
  cleanValue,
  splitServiceId
} from '@stokei/nestjs';
import { DataNotFoundException } from '@/errors';
import { ProductsCategoryModel } from '@/models/products-category.model';
import { FindAllProductsCategoriesQuery } from '@/queries/implements/products-categories/find-all-products-categories.query';
import { CountProductsCategoriesRepository } from '@/repositories/products-categories/count-products-categories';
import { FindAllProductsCategoriesRepository } from '@/repositories/products-categories/find-all-products-categories';

@QueryHandler(FindAllProductsCategoriesQuery)
export class FindAllProductsCategoriesQueryHandler
  implements IQueryHandler<FindAllProductsCategoriesQuery>
{
  constructor(
    private readonly findAllProductsCategoryRepository: FindAllProductsCategoriesRepository,
    private readonly countProductsCategoriesRepository: CountProductsCategoriesRepository
  ) {}

  async execute(
    query: FindAllProductsCategoriesQuery
  ): Promise<IPaginatedType<ProductsCategoryModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const productsCategories =
      await this.findAllProductsCategoryRepository.execute(data);
    const totalCount = await this.countProductsCategoriesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProductsCategoryModel>().toPaginationList({
      items: productsCategories,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllProductsCategoriesQuery
  ): FindAllProductsCategoriesQuery {
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
