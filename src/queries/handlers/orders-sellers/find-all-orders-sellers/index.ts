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
import { OrdersSellerModel } from '@/models/orders-seller.model';
import { FindAllOrdersSellersQuery } from '@/queries/implements/orders-sellers/find-all-orders-sellers.query';
import { CountOrdersSellersRepository } from '@/repositories/orders-sellers/count-orders-sellers';
import { FindAllOrdersSellersRepository } from '@/repositories/orders-sellers/find-all-orders-sellers';

@QueryHandler(FindAllOrdersSellersQuery)
export class FindAllOrdersSellersQueryHandler
  implements IQueryHandler<FindAllOrdersSellersQuery>
{
  constructor(
    private readonly findAllOrdersSellerRepository: FindAllOrdersSellersRepository,
    private readonly countOrdersSellersRepository: CountOrdersSellersRepository
  ) {}

  async execute(
    query: FindAllOrdersSellersQuery
  ): Promise<IPaginatedType<OrdersSellerModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const ordersSellers = await this.findAllOrdersSellerRepository.execute(
      data
    );
    const totalCount = await this.countOrdersSellersRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrdersSellerModel>().toPaginationList({
      items: ordersSellers,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllOrdersSellersQuery
  ): FindAllOrdersSellersQuery {
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
