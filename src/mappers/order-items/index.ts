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
  FindAllOrderItemsDTO,
  WhereDataFindAllOrderItemsDTO
} from '@/dtos/order-items/find-all-order-items.dto';
import { OrderItemEntity } from '@/entities';
import { OrderItemModel } from '@/models/order-item.model';
import { FindAllOrderItemsQuery } from '@/queries/implements/order-items/find-all-order-items.query';

export class OrderItemMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllOrderItemsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          product: prismaMapper.toWhereDataSearch(operatorData.product),
          price: prismaMapper.toWhereData(operatorData.price),
          recurring: prismaMapper.toWhereData(operatorData.recurring),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            product: cleanWhereDataSearch(operatorData.product),
            price: cleanWhereDataString(operatorData.price),
            recurring: cleanWhereDataString(operatorData.recurring),
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
        quantity: cleanSortValue(query.orderBy?.quantity),
        totalAmount: cleanSortValue(query.orderBy?.totalAmount),
        subtotalAmount: cleanSortValue(query.orderBy?.subtotalAmount),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(orderItem: OrderItemEntity) {
    return orderItem && new OrderItemModel(orderItem);
  }
  toModels(orderItems: OrderItemEntity[]) {
    return orderItems?.length > 0
      ? orderItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
