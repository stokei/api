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
import { ProductsTagModel } from '@/models/products-tag.model';
import { FindAllProductsTagsQuery } from '@/queries/implements/products-tags/find-all-products-tags.query';
import { CountProductsTagsRepository } from '@/repositories/products-tags/count-products-tags';
import { FindAllProductsTagsRepository } from '@/repositories/products-tags/find-all-products-tags';

@QueryHandler(FindAllProductsTagsQuery)
export class FindAllProductsTagsQueryHandler
  implements IQueryHandler<FindAllProductsTagsQuery>
{
  constructor(
    private readonly findAllProductsTagRepository: FindAllProductsTagsRepository,
    private readonly countProductsTagsRepository: CountProductsTagsRepository
  ) {}

  async execute(
    query: FindAllProductsTagsQuery
  ): Promise<IPaginatedType<ProductsTagModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const productsTags = await this.findAllProductsTagRepository.execute(data);
    const totalCount = await this.countProductsTagsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProductsTagModel>().toPaginationList({
      items: productsTags,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllProductsTagsQuery): FindAllProductsTagsQuery {
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
