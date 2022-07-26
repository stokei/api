import { Injectable } from '@nestjs/common';
import { IBaseRepository, IOperator, PrismaMapper } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAccountsDTO } from '@/dtos/accounts/count-accounts.dto';

@Injectable()
export class CountAccountsRepository
  implements IBaseRepository<CountAccountsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAccountsDTO): Promise<number> {
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
        app: prismaMapper.toWhereData(operatorData.app),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
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
    return await this.model.account.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}
