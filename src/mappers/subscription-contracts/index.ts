import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllSubscriptionContractsDTO,
  WhereDataFindAllSubscriptionContractsDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts.dto';
import { SubscriptionContractEntity } from '@/entities';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractsQuery } from '@/queries/implements/subscription-contracts/find-all-subscription-contracts.query';

export class SubscriptionContractMapper {
  toWhereFindAllPrisma(
    where: IWhere<WhereDataFindAllSubscriptionContractsDTO>
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
        app: prismaMapper.toWhereData(operatorData.app),
        product: prismaMapper.toWhereDataSearch(operatorData.product),
        invoiceProduct: prismaMapper.toWhereData(operatorData.invoiceProduct),
        invoicePrice: prismaMapper.toWhereData(operatorData.invoicePrice),
        status: operatorData.status,
        type: operatorData.type,
        active: prismaMapper.toWhereData(operatorData.active),
        automaticRenew: prismaMapper.toWhereData(operatorData.automaticRenew),
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
  toFindAllPrisma(data: FindAllSubscriptionContractsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllSubscriptionContractsQuery
  ): FindAllSubscriptionContractsQuery {
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
          product: cleanWhereDataSearch(operatorData.product),
          invoiceProduct: cleanWhereDataString(operatorData.invoiceProduct),
          invoicePrice: cleanWhereDataString(operatorData.invoicePrice),
          status: operatorData.status,
          type: operatorData.type,
          active: cleanWhereDataBoolean(operatorData.active),
          automaticRenew: cleanWhereDataBoolean(operatorData.automaticRenew),
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
        status: cleanSortValue(query.orderBy?.status),
        type: cleanSortValue(query.orderBy?.type),
        active: cleanSortValue(query.orderBy?.active),
        automaticRenew: cleanSortValue(query.orderBy?.automaticRenew),
        startAt: cleanSortValue(query.orderBy?.startAt),
        endAt: cleanSortValue(query.orderBy?.endAt),
        canceledAt: cleanSortValue(query.orderBy?.canceledAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(subscriptionContract: SubscriptionContractEntity) {
    return (
      subscriptionContract &&
      new SubscriptionContractModel(subscriptionContract)
    );
  }
  toModels(subscriptionContracts: SubscriptionContractEntity[]) {
    return subscriptionContracts?.length > 0
      ? subscriptionContracts.map(this.toModel).filter(Boolean)
      : [];
  }
}
