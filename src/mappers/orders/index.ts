import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllOrdersDTO,
  WhereDataFindAllOrdersDTO
} from '@/dtos/orders/find-all-orders.dto';
import { OrderEntity } from '@/entities';
import { OrderModel } from '@/models/order.model';
import { FindAllOrdersQuery } from '@/queries/implements/orders/find-all-orders.query';

export class OrderMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllOrdersDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          currency: prismaMapper.toWhereData(operatorData.currency),
          coupon: prismaMapper.toWhereData(operatorData.coupon),
          status: operatorData.status,
          active: prismaMapper.toWhereData(operatorData.active),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            currency: cleanWhereDataString(operatorData.currency),
            coupon: cleanWhereDataString(operatorData.coupon),
            status: operatorData.status,
            active: cleanWhereDataBoolean(operatorData.active),
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
        currency: cleanSortValue(query.orderBy?.currency),
        status: cleanSortValue(query.orderBy?.status),
        paidAmount: cleanSortValue(query.orderBy?.paidAmount),
        totalAmount: cleanSortValue(query.orderBy?.totalAmount),
        subtotalAmount: cleanSortValue(query.orderBy?.subtotalAmount),
        feeAmount: cleanSortValue(query.orderBy?.feeAmount),
        active: cleanSortValue(query.orderBy?.active),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(order: OrderEntity) {
    return order && new OrderModel(order);
  }
  toModels(orders: OrderEntity[]) {
    return orders?.length > 0 ? orders.map(this.toModel).filter(Boolean) : [];
  }
}
