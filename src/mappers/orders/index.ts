import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { OrderEntity } from '@/entities';
import { OrderModel } from '@/models/order.model';
import { FindAllOrdersQuery } from '@/queries/implements/orders/find-all-orders.query';

export class OrderMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllOrdersDTO>) {
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
  toFindAllPrisma(data: FindAllOrdersDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllOrdersQuery): FindAllOrdersQuery {
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
          cart: cleanWhereDataString(operatorData.cart),
          customer: cleanWhereDataString(operatorData.customer),
          currency: cleanWhereDataString(operatorData.currency),
          status: operatorData.status,
          oldStatus: operatorData.oldStatus,
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
        applicationFeePercentage: cleanSortValue(
          query.orderBy?.applicationFeePercentage
        ),
        applicationFeeAmount: cleanSortValue(
          query.orderBy?.applicationFeeAmount
        ),
        currency: cleanSortValue(query.orderBy?.currency),
        amount: cleanSortValue(query.orderBy?.amount),
        discountAmount: cleanSortValue(query.orderBy?.discountAmount),
        subtotalAmount: cleanSortValue(query.orderBy?.subtotalAmount),
        totalAmount: cleanSortValue(query.orderBy?.totalAmount),
        status: cleanSortValue(query.orderBy?.status),
        oldStatus: cleanSortValue(query.orderBy?.oldStatus),
        active: cleanSortValue(query.orderBy?.active),
        paidAt: cleanSortValue(query.orderBy?.paidAt),
        canceledAt: cleanSortValue(query.orderBy?.canceledAt),
        paymentErrorAt: cleanSortValue(query.orderBy?.paymentErrorAt),
        totalRefundedAt: cleanSortValue(query.orderBy?.totalRefundedAt),
        parcialRefundedAt: cleanSortValue(query.orderBy?.parcialRefundedAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(order: OrderEntity) {
    return (
      order &&
      new OrderModel({
        ...order,
        updatedAt: convertToISODateString(order.updatedAt),
        createdAt: convertToISODateString(order.createdAt)
      })
    );
  }
  toModels(orders: OrderEntity[]) {
    return orders?.length > 0 ? orders.map(this.toModel).filter(Boolean) : [];
  }
}
