import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { OrderItemEntity } from '@/entities';
import { OrderItemModel } from '@/models/order-item.model';
import { FindAllOrderItemsQuery } from '@/queries/implements/order-items/find-all-order-items.query';

export class OrderItemMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllOrderItemsDTO>) {
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
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent),
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
  toFindAllPrisma(data: FindAllOrderItemsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllOrderItemsQuery): FindAllOrderItemsQuery {
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
          order: cleanWhereDataString(operatorData.order),
          product: cleanWhereDataString(operatorData.product),
          description: cleanWhereDataString(operatorData.description),
          type: operatorData.type,
          recurringIntervalCount: cleanWhereDataNumber(
            operatorData.recurringIntervalCount
          ),
          recurringIntervalType: operatorData.recurringIntervalType,
          name: cleanWhereDataSearch(operatorData.name),
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
        type: cleanSortValue(query.orderBy?.type),
        quantity: cleanSortValue(query.orderBy?.quantity),
        recurringIntervalCount: cleanSortValue(
          query.orderBy?.recurringIntervalCount
        ),
        recurringIntervalType: cleanSortValue(
          query.orderBy?.recurringIntervalType
        ),
        amount: cleanSortValue(query.orderBy?.amount),
        fromAmount: cleanSortValue(query.orderBy?.fromAmount),
        toAmount: cleanSortValue(query.orderBy?.toAmount),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(orderItem: OrderItemEntity) {
    return (
      orderItem &&
      new OrderItemModel({
        ...orderItem,
        updatedAt: convertToISODateString(orderItem.updatedAt),
        createdAt: convertToISODateString(orderItem.createdAt)
      })
    );
  }
  toModels(orderItems: OrderItemEntity[]) {
    return orderItems?.length > 0
      ? orderItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
