import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAccountsDTO } from '@/dtos/accounts/find-all-accounts.dto';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAllAccountsRepository
  implements IBaseRepository<FindAllAccountsDTO, Promise<AccountModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAccountsDTO): Promise<AccountModel[]> {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = data?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        parent: prismaMapper.toWhereData(operatorData.parent),
        firstname: prismaMapper.toWhereDataSearch(operatorData.firstname),
        lastname: prismaMapper.toWhereDataSearch(operatorData.lastname),
        email: prismaMapper.toWhereData(operatorData.email),
        username: prismaMapper.toWhereData(operatorData.username),
        ...(operatorData?.roles?.length > 0 && {
          roles: {
            hasEvery: operatorData?.roles
          }
        })
      };
    };
    return new AccountMapper().toModels(
      await this.model.account.findMany({
        where: prismaMapper.toWhere({
          AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
          OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
          NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
        }),
        orderBy,
        ...prismaMapper.toPagination({ page: data?.page })
      })
    );
  }
}
