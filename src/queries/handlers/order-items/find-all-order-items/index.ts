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
import { OrderItemModel } from '@/models/order-item.model';
import { FindAllOrderItemsQuery } from '@/queries/implements/order-items/find-all-order-items.query';
import { CountOrderItemsRepository } from '@/repositories/order-items/count-order-items';
import { FindAllOrderItemsRepository } from '@/repositories/order-items/find-all-order-items';

@QueryHandler(FindAllOrderItemsQuery)
export class FindAllOrderItemsQueryHandler
  implements IQueryHandler<FindAllOrderItemsQuery>
{
  constructor(
    private readonly findAllOrderItemRepository: FindAllOrderItemsRepository,
    private readonly countOrderItemsRepository: CountOrderItemsRepository
  ) {}

  async execute(
    query: FindAllOrderItemsQuery
  ): Promise<IPaginatedType<OrderItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const orderItems = await this.findAllOrderItemRepository.execute(data);
    const totalCount = await this.countOrderItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrderItemModel>().toPaginationList({
      items: orderItems,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllOrderItemsQuery): FindAllOrderItemsQuery {
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
