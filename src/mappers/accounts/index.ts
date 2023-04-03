import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllAccountsDTO,
  WhereDataFindAllAccountsDTO
} from '@/dtos/accounts/find-all-accounts.dto';
import { AccountEntity } from '@/entities';
import { AccountModel } from '@/models/account.model';
import { FindAllAccountsQuery } from '@/queries/implements/accounts/find-all-accounts.query';

export class AccountMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllAccountsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy),
          firstname: prismaMapper.toWhereDataSearch(operatorData.firstname),
          lastname: prismaMapper.toWhereDataSearch(operatorData.lastname),
          email: prismaMapper.toWhereData(operatorData.email),
          username: prismaMapper.toWhereData(operatorData.username)
        };
      }
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            app: cleanWhereDataString(operatorData.app),
            firstname: cleanWhereDataSearch(operatorData.firstname),
            lastname: cleanWhereDataSearch(operatorData.lastname),
            email: cleanWhereDataString(operatorData.email),
            username: cleanWhereDataString(operatorData.username),
            updatedBy: cleanWhereDataString(operatorData.updatedBy),
            createdBy: cleanWhereDataString(operatorData.createdBy),
            ids:
              operatorData.ids?.length > 0
                ? operatorData.ids.map(
                    (id) => splitServiceId(cleanValue(id))?.id
                  )
                : undefined
          };
        }
      }),
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
