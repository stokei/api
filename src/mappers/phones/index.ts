import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllPhonesDTO,
  WhereDataFindAllPhonesDTO
} from '@/dtos/phones/find-all-phones.dto';
import { PhoneEntity } from '@/entities';
import { PhoneModel } from '@/models/phone.model';
import { FindAllPhonesQuery } from '@/queries/implements/phones/find-all-phones.query';

export class PhoneMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPhonesDTO>) {
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
        countryCode: prismaMapper.toWhereData(operatorData.countryCode),
        areaCode: prismaMapper.toWhereData(operatorData.areaCode),
        number: prismaMapper.toWhereData(operatorData.number),
        validationCode: prismaMapper.toWhereData(operatorData.validationCode),
        status: operatorData.status,
        active: prismaMapper.toWhereData(operatorData.active),
        app: prismaMapper.toWhereData(operatorData.app),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
    });
  }
  toFindAllPrisma(data: FindAllPhonesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPhonesQuery): FindAllPhonesQuery {
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
          countryCode: cleanWhereDataString(operatorData.countryCode),
          areaCode: cleanWhereDataString(operatorData.areaCode),
          number: cleanWhereDataString(operatorData.number),
          validationCode: cleanWhereDataString(operatorData.validationCode),
          status: operatorData.status,
          active: cleanWhereDataBoolean(operatorData.active),
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
        fullnumber: cleanSortValue(query.orderBy?.fullnumber),
        countryCode: cleanSortValue(query.orderBy?.countryCode),
        areaCode: cleanSortValue(query.orderBy?.areaCode),
        number: cleanSortValue(query.orderBy?.number),
        status: cleanSortValue(query.orderBy?.status),
        active: cleanSortValue(query.orderBy?.active),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(phone: PhoneEntity) {
    return phone && new PhoneModel(phone);
  }
  toModels(phones: PhoneEntity[]) {
    return phones?.length > 0 ? phones.map(this.toModel).filter(Boolean) : [];
  }
}
