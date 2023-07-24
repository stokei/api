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
  FindAllSubscriptionContractItemsDTO,
  WhereDataFindAllSubscriptionContractItemsDTO
} from '@/dtos/subscription-contract-items/find-all-subscription-contract-items.dto';
import { SubscriptionContractItemEntity } from '@/entities';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllSubscriptionContractItemsQuery } from '@/queries/implements/subscription-contract-items/find-all-subscription-contract-items.query';

export class SubscriptionContractItemMapper {
  toWhereFindAllPrisma(
    where: IWhere<WhereDataFindAllSubscriptionContractItemsDTO>
  ) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          product: prismaMapper.toWhereDataSearch(operatorData.product),
          app: prismaMapper.toWhereData(operatorData.app),
          price: prismaMapper.toWhereData(operatorData.price),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllSubscriptionContractItemsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllSubscriptionContractItemsQuery
  ): FindAllSubscriptionContractItemsQuery {
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
            price: cleanWhereDataSearch(operatorData.price),
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
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(subscriptionContractItem: SubscriptionContractItemEntity) {
    return (
      subscriptionContractItem &&
      new SubscriptionContractItemModel(subscriptionContractItem)
    );
  }
  toModels(subscriptionContractItems: SubscriptionContractItemEntity[]) {
    return subscriptionContractItems?.length > 0
      ? subscriptionContractItems.map(this.toModel).filter(Boolean)
      : [];
  }
}
