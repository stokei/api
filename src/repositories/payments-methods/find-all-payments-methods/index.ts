import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllPaymentsMethodsDTO } from '@/dtos/payments-methods/find-all-payments-methods.dto';
import { PaymentsMethodMapper } from '@/mappers/payments-methods';
import { PaymentsMethodModel } from '@/models/payments-method.model';

@Injectable()
export class FindAllPaymentsMethodsRepository
  implements
    IBaseRepository<FindAllPaymentsMethodsDTO, Promise<PaymentsMethodModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllPaymentsMethodsDTO
  ): Promise<PaymentsMethodModel[]> {
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
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent)
      };
    };
    return new PaymentsMethodMapper().toModels(
      await this.model.paymentsMethod.findMany({
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
