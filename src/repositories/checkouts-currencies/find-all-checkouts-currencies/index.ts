import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCheckoutsCurrenciesDTO } from '@/dtos/checkouts-currencies/find-all-checkouts-currencies.dto';
import { CheckoutsCurrencyMapper } from '@/mappers/checkouts-currencies';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

@Injectable()
export class FindAllCheckoutsCurrenciesRepository
  implements
    IBaseRepository<
      FindAllCheckoutsCurrenciesDTO,
      Promise<CheckoutsCurrencyModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllCheckoutsCurrenciesDTO
  ): Promise<CheckoutsCurrencyModel[]> {
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
    return new CheckoutsCurrencyMapper().toModels(
      await this.model.checkoutsCurrency.findMany({
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
