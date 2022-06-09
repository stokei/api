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
import { CategoryModel } from '@/models/category.model';
import { FindAllCategoriesQuery } from '@/queries/implements/categories/find-all-categories.query';
import { CountCategoriesRepository } from '@/repositories/categories/count-categories';
import { FindAllCategoriesRepository } from '@/repositories/categories/find-all-categories';

@QueryHandler(FindAllCategoriesQuery)
export class FindAllCategoriesQueryHandler
  implements IQueryHandler<FindAllCategoriesQuery>
{
  constructor(
    private readonly findAllCategoryRepository: FindAllCategoriesRepository,
    private readonly countCategoriesRepository: CountCategoriesRepository
  ) {}

  async execute(
    query: FindAllCategoriesQuery
  ): Promise<IPaginatedType<CategoryModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const categories = await this.findAllCategoryRepository.execute(data);
    const totalCount = await this.countCategoriesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CategoryModel>().toPaginationList({
      items: categories,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCategoriesQuery): FindAllCategoriesQuery {
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
