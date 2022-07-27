import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { AccountEntity } from '@/entities';
import { AccountModel } from '@/models/account.model';
import { FindAllAccountsQuery } from '@/queries/implements/accounts/find-all-accounts.query';

export class AccountMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllAccountsDTO>) {
    const prismaMapper = new PrismaMapper();
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
    });
  }
  toFindAllPrisma(data: FindAllAccountsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllAccountsQuery): FindAllAccountsQuery {
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
          app: cleanWhereDataString(operatorData.app),
          firstname: cleanWhereDataSearch(operatorData.firstname),
          lastname: cleanWhereDataSearch(operatorData.lastname),
          email: cleanWhereDataString(operatorData.email),
          username: cleanWhereDataString(operatorData.username),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
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
  toModel(account: AccountEntity) {
    return account && new AccountModel(account);
  }
  toModels(accounts: AccountEntity[]) {
    return accounts?.length > 0
      ? accounts.map(this.toModel).filter(Boolean)
      : [];
  }
}
