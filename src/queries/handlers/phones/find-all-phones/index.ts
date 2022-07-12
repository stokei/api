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
import { PhoneModel } from '@/models/phone.model';
import { FindAllPhonesQuery } from '@/queries/implements/phones/find-all-phones.query';
import { CountPhonesRepository } from '@/repositories/phones/count-phones';
import { FindAllPhonesRepository } from '@/repositories/phones/find-all-phones';

@QueryHandler(FindAllPhonesQuery)
export class FindAllPhonesQueryHandler
  implements IQueryHandler<FindAllPhonesQuery>
{
  constructor(
    private readonly findAllPhoneRepository: FindAllPhonesRepository,
    private readonly countPhonesRepository: CountPhonesRepository
  ) {}

  async execute(
    query: FindAllPhonesQuery
  ): Promise<IPaginatedType<PhoneModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const phones = await this.findAllPhoneRepository.execute(data);
    const totalCount = await this.countPhonesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PhoneModel>().toPaginationList({
      items: phones,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllPhonesQuery): FindAllPhonesQuery {
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
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
