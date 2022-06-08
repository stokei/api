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
import { OrdersAddressModel } from '@/models/orders-address.model';
import { FindAllOrdersAddressesQuery } from '@/queries/implements/orders-addresses/find-all-orders-addresses.query';
import { CountOrdersAddressesRepository } from '@/repositories/orders-addresses/count-orders-addresses';
import { FindAllOrdersAddressesRepository } from '@/repositories/orders-addresses/find-all-orders-addresses';

@QueryHandler(FindAllOrdersAddressesQuery)
export class FindAllOrdersAddressesQueryHandler
  implements IQueryHandler<FindAllOrdersAddressesQuery>
{
  constructor(
    private readonly findAllOrdersAddressRepository: FindAllOrdersAddressesRepository,
    private readonly countOrdersAddressesRepository: CountOrdersAddressesRepository
  ) {}

  async execute(
    query: FindAllOrdersAddressesQuery
  ): Promise<IPaginatedType<OrdersAddressModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const ordersAddresses = await this.findAllOrdersAddressRepository.execute(
      data
    );
    const totalCount = await this.countOrdersAddressesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<OrdersAddressModel>().toPaginationList({
      items: ordersAddresses,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllOrdersAddressesQuery
  ): FindAllOrdersAddressesQuery {
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
