import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllProductsDTO,
  WhereDataFindAllProductsDTO
} from '@/dtos/products/find-all-products.dto';
import { ProductEntity } from '@/entities';
import { ProductModel } from '@/models/product.model';
import { FindAllProductsQuery } from '@/queries/implements/products/find-all-products.query';

export class ProductMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllProductsDTO>) {
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
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        description: prismaMapper.toWhereDataSearch(operatorData.description),
        checkoutVisible: prismaMapper.toWhereData(operatorData.checkoutVisible),
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
  toFindAllPrisma(data: FindAllProductsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllProductsQuery): FindAllProductsQuery {
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
          name: cleanWhereDataSearch(operatorData.name),
          description: cleanWhereDataSearch(operatorData.description),
          checkoutVisible: cleanWhereDataBoolean(operatorData.checkoutVisible),
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
        name: cleanSortValue(query.orderBy?.name),
        description: cleanSortValue(query.orderBy?.description),
        app: cleanSortValue(query.orderBy?.app),
        stripeProduct: cleanSortValue(query.orderBy?.stripeProduct),
        checkoutVisible: cleanSortValue(query.orderBy?.checkoutVisible),
        avatar: cleanSortValue(query.orderBy?.avatar),
        active: cleanSortValue(query.orderBy?.active),
        activatedAt: cleanSortValue(query.orderBy?.activatedAt),
        deactivatedAt: cleanSortValue(query.orderBy?.deactivatedAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(product: ProductEntity) {
    return (
      product &&
      new ProductModel({
        ...product,
        updatedAt: convertToISODateString(product.updatedAt),
        createdAt: convertToISODateString(product.createdAt)
      })
    );
  }
  toModels(products: ProductEntity[]) {
    return products?.length > 0
      ? products.map(this.toModel).filter(Boolean)
      : [];
  }
}
