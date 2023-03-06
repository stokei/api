import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataSearch,
  cleanWhereDataString,
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
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          catalog: prismaMapper.toWhereData(operatorData.catalog),
          product: prismaMapper.toWhereData(operatorData.product),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        allowIsEmptyValues: {
          NOT: true
        },
        operatorMapper(operatorData) {
          return {
            catalog: cleanWhereDataString(operatorData.catalog),
            product: cleanWhereDataSearch(operatorData.product),
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
