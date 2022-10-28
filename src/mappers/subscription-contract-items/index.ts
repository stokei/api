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
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        parent: prismaMapper.toWhereDataSearch(operatorData.parent),
        product: prismaMapper.toWhereDataSearch(operatorData.product),
        app: prismaMapper.toWhereData(operatorData.app),
        price: prismaMapper.toWhereData(operatorData.price),
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
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataSearch(operatorData.parent),
          product: cleanWhereDataString(operatorData.product),
          price: cleanWhereDataSearch(operatorData.price),
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
