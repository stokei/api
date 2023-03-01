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
  FindAllCatalogItemsDTO,
  WhereDataFindAllCatalogItemsDTO
} from '@/dtos/catalog-items/find-all-catalog-items.dto';
import { CatalogItemEntity } from '@/entities';
import { CatalogItemModel } from '@/models/catalog-item.model';
import { FindAllCatalogItemsQuery } from '@/queries/implements/catalog-items/find-all-catalog-items.query';

export class CatalogItemMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllCatalogItemsDTO>) {
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
        catalog: prismaMapper.toWhereData(operatorData.catalog),
        product: prismaMapper.toWhereData(operatorData.product),
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
  toFindAllPrisma(data: FindAllCatalogItemsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllCatalogItemsQuery
  ): FindAllCatalogItemsQuery {
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
          catalog: cleanWhereDataString(operatorData.catalog),
          product: cleanWhereDataSearch(operatorData.product),
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
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(catalogItem: CatalogItemEntity) {
    return catalogItem && new CatalogItemModel(catalogItem);
  }
  toModels(catalogItems: CatalogItemEntity[]) {
    return catalogItems?.length > 0
      ? catalogItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
