import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataBoolean,
  cleanWhereDataNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
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
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
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
      }
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        allowIsEmptyValues: {
          NOT: true
        },
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            amount: cleanWhereDataNumber(operatorData.amount),
            upTo: cleanWhereDataNumber(operatorData.upTo),
            infinite: cleanWhereDataBoolean(operatorData.infinite),
            app: cleanWhereDataString(operatorData.app),
            updatedBy: cleanWhereDataString(operatorData.updatedBy),
            createdBy: cleanWhereDataString(operatorData.createdBy),
            ids:
              operatorData.ids?.length > 0
                ? operatorData.ids.map(
                    (id) => splitServiceId(cleanValue(id))?.id
                  )
                : undefined
          };
        }
      }),
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
