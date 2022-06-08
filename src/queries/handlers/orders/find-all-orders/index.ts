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
import { OrderModel } from '@/models/order.model';
import { FindAllOrdersQuery } from '@/queries/implements/orders/find-all-orders.query';
import { CountOrdersRepository } from '@/repositories/orders/count-orders';
import { FindAllOrdersRepository } from '@/repositories/orders/find-all-orders';

@QueryHandler(FindAllOrdersQuery)
export class FindAllOrdersQueryHandler
  implements IQueryHandler<FindAllOrdersQuery>
{
  constructor(
    private readonly findAllOrderRepository: FindAllOrdersRepository,
    private readonly countOrdersRepository: CountOrdersRepository
  ) {}

  async execute(
    query: FindAllOrdersQuery
  ): Promise<IPaginatedType<OrderModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const orders = await this.findAllOrderRepository.execute(data);
    const totalCount = await this.countOrdersRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrderModel>().toPaginationList({
      items: orders,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllOrdersQuery): FindAllOrdersQuery {
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
