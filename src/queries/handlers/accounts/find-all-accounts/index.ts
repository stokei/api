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
import { AccountModel } from '@/models/account.model';
import { FindAllAccountsQuery } from '@/queries/implements/accounts/find-all-accounts.query';
import { CountAccountsRepository } from '@/repositories/accounts/count-accounts';
import { FindAllAccountsRepository } from '@/repositories/accounts/find-all-accounts';

@QueryHandler(FindAllAccountsQuery)
export class FindAllAccountsQueryHandler
  implements IQueryHandler<FindAllAccountsQuery>
{
  constructor(
    private readonly findAllAccountRepository: FindAllAccountsRepository,
    private readonly countAccountsRepository: CountAccountsRepository
  ) {}

  async execute(
    query: FindAllAccountsQuery
  ): Promise<IPaginatedType<AccountModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const accounts = await this.findAllAccountRepository.execute(data);
    const totalCount = await this.countAccountsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AccountModel>().toPaginationList({
      items: accounts,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllAccountsQuery): FindAllAccountsQuery {
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
          firstname: cleanWhereDataSearch(operatorData.firstname),
          lastname: cleanWhereDataSearch(operatorData.lastname),
          email: cleanWhereDataString(operatorData.email),
          username: cleanWhereDataString(operatorData.username),
          roles:
            operatorData.roles?.length > 0
              ? operatorData.roles.map((role) => cleanValue(role))
              : undefined,
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
        firstname: cleanSortValue(query.orderBy?.firstname),
        lastname: cleanSortValue(query.orderBy?.lastname),
        email: cleanSortValue(query.orderBy?.email),
        username: cleanSortValue(query.orderBy?.username),
        status: cleanSortValue(query.orderBy?.status),
        canceledAt: cleanSortValue(query.orderBy?.canceledAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
