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
import { AddressModel } from '@/models/address.model';
import { FindAllAddressesQuery } from '@/queries/implements/addresses/find-all-addresses.query';
import { CountAddressesRepository } from '@/repositories/addresses/count-addresses';
import { FindAllAddressesRepository } from '@/repositories/addresses/find-all-addresses';

@QueryHandler(FindAllAddressesQuery)
export class FindAllAddressesQueryHandler
  implements IQueryHandler<FindAllAddressesQuery>
{
  constructor(
    private readonly findAllAddressRepository: FindAllAddressesRepository,
    private readonly countAddressesRepository: CountAddressesRepository
  ) {}

  async execute(
    query: FindAllAddressesQuery
  ): Promise<IPaginatedType<AddressModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const addresses = await this.findAllAddressRepository.execute(data);
    const totalCount = await this.countAddressesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AddressModel>().toPaginationList({
      items: addresses,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllAddressesQuery): FindAllAddressesQuery {
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
