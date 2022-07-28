import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataNumber,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllPricesDTO,
  WhereDataFindAllPricesDTO
} from '@/dtos/prices/find-all-prices.dto';
import { PriceEntity } from '@/entities';
import { PriceModel } from '@/models/price.model';
import { FindAllPricesQuery } from '@/queries/implements/prices/find-all-prices.query';

export class PriceMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPricesDTO>) {
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
        default: prismaMapper.toWhereData(operatorData.default),
        type: operatorData.type,
        inventoryType: operatorData.inventoryType,
        recurringIntervalCount: prismaMapper.toWhereData(
          operatorData.recurringIntervalCount
        ),
        recurringIntervalType: operatorData.recurringIntervalType,
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
  toFindAllPrisma(data: FindAllPricesDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPricesQuery): FindAllPricesQuery {
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
          parent: cleanWhereDataString(operatorData.parent),
          default: cleanWhereDataBoolean(operatorData.default),
          type: operatorData.type,
          inventoryType: operatorData.inventoryType,
          recurringIntervalCount: cleanWhereDataNumber(
            operatorData.recurringIntervalCount
          ),
          recurringIntervalType: operatorData.recurringIntervalType,
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
        amount: cleanSortValue(query.orderBy?.amount),
        fromAmount: cleanSortValue(query.orderBy?.fromAmount),
        toAmount: cleanSortValue(query.orderBy?.toAmount),
        type: cleanSortValue(query.orderBy?.type),
        inventoryType: cleanSortValue(query.orderBy?.inventoryType),
        recurringIntervalCount: cleanSortValue(
          query.orderBy?.recurringIntervalCount
        ),
        recurringIntervalType: cleanSortValue(
          query.orderBy?.recurringIntervalType
        ),
        quantity: cleanSortValue(query.orderBy?.quantity),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(price: PriceEntity) {
    return (
      price &&
      new PriceModel({
        ...price,
        updatedAt: convertToISODateString(price.updatedAt),
        createdAt: convertToISODateString(price.createdAt)
      })
    );
  }
  toModels(prices: PriceEntity[]) {
    return prices?.length > 0 ? prices.map(this.toModel).filter(Boolean) : [];
  }
}
