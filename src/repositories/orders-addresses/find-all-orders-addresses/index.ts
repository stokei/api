import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllOrdersAddressesDTO } from '@/dtos/orders-addresses/find-all-orders-addresses.dto';
import { OrdersAddressMapper } from '@/mappers/orders-addresses';
import { OrdersAddressModel } from '@/models/orders-address.model';

@Injectable()
export class FindAllOrdersAddressesRepository
  implements
    IBaseRepository<FindAllOrdersAddressesDTO, Promise<OrdersAddressModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllOrdersAddressesDTO
  ): Promise<OrdersAddressModel[]> {
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
    return new OrdersAddressMapper().toModels(
      await this.model.ordersAddress.findMany({
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
