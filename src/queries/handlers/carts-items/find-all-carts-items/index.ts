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
import { CartsItemModel } from '@/models/carts-item.model';
import { FindAllCartsItemsQuery } from '@/queries/implements/carts-items/find-all-carts-items.query';
import { CountCartsItemsRepository } from '@/repositories/carts-items/count-carts-items';
import { FindAllCartsItemsRepository } from '@/repositories/carts-items/find-all-carts-items';

@QueryHandler(FindAllCartsItemsQuery)
export class FindAllCartsItemsQueryHandler
  implements IQueryHandler<FindAllCartsItemsQuery>
{
  constructor(
    private readonly findAllCartsItemRepository: FindAllCartsItemsRepository,
    private readonly countCartsItemsRepository: CountCartsItemsRepository
  ) {}

  async execute(
    query: FindAllCartsItemsQuery
  ): Promise<IPaginatedType<CartsItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const cartsItems = await this.findAllCartsItemRepository.execute(data);
    const totalCount = await this.countCartsItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CartsItemModel>().toPaginationList({
      items: cartsItems,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCartsItemsQuery): FindAllCartsItemsQuery {
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
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
