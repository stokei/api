import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAddressesDTO } from '@/dtos/addresses/find-all-addresses.dto';
import { AddressMapper } from '@/mappers/addresses';
import { AddressModel } from '@/models/address.model';

@Injectable()
export class FindAllAddressesRepository
  implements IBaseRepository<FindAllAddressesDTO, Promise<AddressModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAddressesDTO): Promise<AddressModel[]> {
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
    return new AddressMapper().toModels(
      await this.model.address.findMany({
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
