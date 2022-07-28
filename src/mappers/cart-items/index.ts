import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataNumber,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllCartItemsDTO,
  WhereDataFindAllCartItemsDTO
} from '@/dtos/cart-items/find-all-cart-items.dto';
import { CartItemEntity } from '@/entities';
import { CartItemModel } from '@/models/cart-item.model';
import { FindAllCartItemsQuery } from '@/queries/implements/cart-items/find-all-cart-items.query';

export class CartItemMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllCartItemsDTO>) {
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
        app: prismaMapper.toWhereData(operatorData.app),
        price: prismaMapper.toWhereData(operatorData.price),
        quantity: prismaMapper.toWhereData(operatorData.quantity),
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
  toFindAllPrisma(data: FindAllCartItemsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllCartItemsQuery): FindAllCartItemsQuery {
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
          price: cleanWhereDataString(operatorData.price),
          app: cleanWhereDataString(operatorData.app),
          quantity: cleanWhereDataNumber(operatorData.quantity),
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
        quantity: cleanSortValue(query.orderBy?.quantity),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(cartItem: CartItemEntity) {
    return (
      cartItem &&
      new CartItemModel({
        ...cartItem,
        updatedAt: convertToISODateString(cartItem.updatedAt),
        createdAt: convertToISODateString(cartItem.createdAt)
      })
    );
  }
  toModels(cartItems: CartItemEntity[]) {
    return cartItems?.length > 0
      ? cartItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
