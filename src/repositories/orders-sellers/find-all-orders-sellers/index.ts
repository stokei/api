import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllOrdersSellersDTO } from '@/dtos/orders-sellers/find-all-orders-sellers.dto';
import { OrdersSellerMapper } from '@/mappers/orders-sellers';
import { OrdersSellerModel } from '@/models/orders-seller.model';

@Injectable()
export class FindAllOrdersSellersRepository
  implements
    IBaseRepository<FindAllOrdersSellersDTO, Promise<OrdersSellerModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllOrdersSellersDTO): Promise<OrdersSellerModel[]> {
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
    return new OrdersSellerMapper().toModels(
      await this.model.ordersSeller.findMany({
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
