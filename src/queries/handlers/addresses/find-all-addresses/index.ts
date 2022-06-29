import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
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
          default: cleanWhereDataBoolean(operatorData.default),
          street: cleanWhereDataSearch(operatorData.street),
          complement: cleanWhereDataSearch(operatorData.complement),
          city: cleanWhereDataSearch(operatorData.city),
          country: cleanWhereDataSearch(operatorData.country),
          state: cleanWhereDataSearch(operatorData.state),
          postalCode: cleanWhereDataString(operatorData.postalCode),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
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
        parent: cleanSortValue(query.orderBy?.parent),
        default: cleanSortValue(query.orderBy?.default),
        street: cleanSortValue(query.orderBy?.street),
        complement: cleanSortValue(query.orderBy?.complement),
        city: cleanSortValue(query.orderBy?.city),
        country: cleanSortValue(query.orderBy?.country),
        state: cleanSortValue(query.orderBy?.state),
        postalCode: cleanSortValue(query.orderBy?.postalCode),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
