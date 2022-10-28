import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllPriceTiersDTO,
  WhereDataFindAllPriceTiersDTO
} from '@/dtos/price-tiers/find-all-price-tiers.dto';
import { PriceTierEntity } from '@/entities';
import { PriceTierModel } from '@/models/price-tier.model';
import { FindAllPriceTiersQuery } from '@/queries/implements/price-tiers/find-all-price-tiers.query';

export class PriceTierMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllPriceTiersDTO>) {
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
        app: prismaMapper.toWhereData(operatorData.app),
        parent: prismaMapper.toWhereDataSearch(operatorData.parent),
        amount: prismaMapper.toWhereData(operatorData.amount),
        upTo: prismaMapper.toWhereData(operatorData.upTo),
        infinite: prismaMapper.toWhereData(operatorData.infinite),
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
  toFindAllPrisma(data: FindAllPriceTiersDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllPriceTiersQuery): FindAllPriceTiersQuery {
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
          amount: cleanWhereDataNumber(operatorData.amount),
          upTo: cleanWhereDataNumber(operatorData.upTo),
          infinite: cleanWhereDataBoolean(operatorData.infinite),
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
        amount: cleanSortValue(query.orderBy?.amount),
        upTo: cleanSortValue(query.orderBy?.upTo),
        infinite: cleanSortValue(query.orderBy?.infinite),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(priceTier: PriceTierEntity) {
    return priceTier && new PriceTierModel(priceTier);
  }
  toModels(priceTiers: PriceTierEntity[]) {
    return priceTiers?.length > 0
      ? priceTiers.map(this.toModel).filter(Boolean)
      : [];
  }
}
