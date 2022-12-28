import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllAddressesDTO,
  WhereDataFindAllAddressesDTO
} from '@/dtos/addresses/find-all-addresses.dto';
import { AddressEntity } from '@/entities';
import { AddressModel } from '@/models/address.model';
import { FindAllAddressesQuery } from '@/queries/implements/addresses/find-all-addresses.query';

export class AddressMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllAddressesDTO>) {
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
        parent: prismaMapper.toWhereDataSearch(operatorData.parent),
        app: prismaMapper.toWhereData(operatorData.app),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        street: prismaMapper.toWhereDataSearch(operatorData.street),
        complement: prismaMapper.toWhereDataSearch(operatorData.complement),
        city: prismaMapper.toWhereDataSearch(operatorData.city),
        country: prismaMapper.toWhereDataSearch(operatorData.country),
        state: prismaMapper.toWhereDataSearch(operatorData.state),
        postalCode: prismaMapper.toWhereData(operatorData.postalCode)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
    });
  }
  toFindAllPrisma(data: FindAllAddressesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllAddressesQuery): FindAllAddressesQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataSearch(operatorData.parent),
          street: cleanWhereDataSearch(operatorData.street),
          complement: cleanWhereDataSearch(operatorData.complement),
          city: cleanWhereDataSearch(operatorData.city),
          country: cleanWhereDataSearch(operatorData.country),
          state: cleanWhereDataSearch(operatorData.state),
          postalCode: cleanWhereDataString(operatorData.postalCode),
          app: cleanWhereDataString(operatorData.app),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        default: cleanSortValue(query.orderBy?.default),
        street: cleanSortValue(query.orderBy?.street),
        complement: cleanSortValue(query.orderBy?.complement),
        city: cleanSortValue(query.orderBy?.city),
        country: cleanSortValue(query.orderBy?.country),
        state: cleanSortValue(query.orderBy?.state),
        postalCode: cleanSortValue(query.orderBy?.postalCode),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(address: AddressEntity) {
    return address && new AddressModel(address);
  }
  toModels(addresses: AddressEntity[]) {
    return addresses?.length > 0
      ? addresses.map(this.toModel).filter(Boolean)
      : [];
  }
}
