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
import { DomainModel } from '@/models/domain.model';
import { FindAllDomainsQuery } from '@/queries/implements/domains/find-all-domains.query';
import { CountDomainsRepository } from '@/repositories/domains/count-domains';
import { FindAllDomainsRepository } from '@/repositories/domains/find-all-domains';

@QueryHandler(FindAllDomainsQuery)
export class FindAllDomainsQueryHandler
  implements IQueryHandler<FindAllDomainsQuery>
{
  constructor(
    private readonly findAllDomainRepository: FindAllDomainsRepository,
    private readonly countDomainsRepository: CountDomainsRepository
  ) {}

  async execute(
    query: FindAllDomainsQuery
  ): Promise<IPaginatedType<DomainModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const domains = await this.findAllDomainRepository.execute(data);
    const totalCount = await this.countDomainsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<DomainModel>().toPaginationList({
      items: domains,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllDomainsQuery): FindAllDomainsQuery {
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
