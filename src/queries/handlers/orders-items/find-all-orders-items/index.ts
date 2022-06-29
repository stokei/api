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
import { OrdersItemModel } from '@/models/orders-item.model';
import { FindAllOrdersItemsQuery } from '@/queries/implements/orders-items/find-all-orders-items.query';
import { CountOrdersItemsRepository } from '@/repositories/orders-items/count-orders-items';
import { FindAllOrdersItemsRepository } from '@/repositories/orders-items/find-all-orders-items';

@QueryHandler(FindAllOrdersItemsQuery)
export class FindAllOrdersItemsQueryHandler
  implements IQueryHandler<FindAllOrdersItemsQuery>
{
  constructor(
    private readonly findAllOrdersItemRepository: FindAllOrdersItemsRepository,
    private readonly countOrdersItemsRepository: CountOrdersItemsRepository
  ) {}

  async execute(
    query: FindAllOrdersItemsQuery
  ): Promise<IPaginatedType<OrdersItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const ordersItems = await this.findAllOrdersItemRepository.execute(data);
    const totalCount = await this.countOrdersItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrdersItemModel>().toPaginationList({
      items: ordersItems,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllOrdersItemsQuery): FindAllOrdersItemsQuery {
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
