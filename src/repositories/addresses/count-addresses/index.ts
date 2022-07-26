import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  IWhere,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAddressesDTO } from '@/dtos/addresses/count-addresses.dto';

@Injectable()
export class CountAddressesRepository
  implements IBaseRepository<CountAddressesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAddressesDTO): Promise<number> {
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
        parent: prismaMapper.toWhereData(operatorData.parent),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        default: prismaMapper.toWhereData(operatorData.default),
        street: prismaMapper.toWhereDataSearch(operatorData.street),
        complement: prismaMapper.toWhereDataSearch(operatorData.complement),
        city: prismaMapper.toWhereDataSearch(operatorData.city),
        country: prismaMapper.toWhereDataSearch(operatorData.country),
        state: prismaMapper.toWhereDataSearch(operatorData.state),
        postalCode: prismaMapper.toWhereData(operatorData.postalCode)
      };
    };
    return await this.model.address.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}
