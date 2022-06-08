import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllCheckoutsDTO } from '@/dtos/checkouts/find-all-checkouts.dto';
import { CheckoutMapper } from '@/mappers/checkouts';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class FindAllCheckoutsRepository
  implements IBaseRepository<FindAllCheckoutsDTO, Promise<CheckoutModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCheckoutsDTO): Promise<CheckoutModel[]> {
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
    return new CheckoutMapper().toModels(
      await this.model.checkout.findMany({
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
