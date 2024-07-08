import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataBoolean,
  cleanWhereDataIntervalString,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllSubscriptionContractsDTO,
  WhereDataFindAllSubscriptionContractsDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts.dto';
import {
  FindAllSubscriptionContractsByItemDTO,
  WhereDataFindAllSubscriptionContractsByItemDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts-by-item.dto';
import { SubscriptionContractEntity } from '@/entities';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractsQuery } from '@/queries/implements/subscription-contracts/find-all-subscription-contracts.query';

export class SubscriptionContractMapper {
  toWhereFindAllPrisma(
    where: IWhere<WhereDataFindAllSubscriptionContractsDTO>
  ) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          app: prismaMapper.toWhereData(operatorData.app),
          order: prismaMapper.toWhereData(operatorData.order),
          paymentMethod: prismaMapper.toWhereData(operatorData.paymentMethod),
          status: operatorData.status,
          type: operatorData.type,
          active: prismaMapper.toWhereData(operatorData.active),
          automaticRenew: prismaMapper.toWhereData(operatorData.automaticRenew),
          startAt: prismaMapper.toWhereDataInterval(operatorData.startAt),
          endAt: prismaMapper.toWhereDataInterval(operatorData.endAt),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toWhereFindAllByItemPrisma(
    where: WhereDataFindAllSubscriptionContractsByItemDTO
  ) {
    const prismaMapper = new PrismaMapper();
    return cleanObject({
      product: prismaMapper.toWhereDataSearch(where.product),
      parent: prismaMapper.toWhereDataSearch(where.parent),
      app: prismaMapper.toWhereData(where.app)
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
  toFindAllByItemPrisma(data: FindAllSubscriptionContractsByItemDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllByItemPrisma(data?.where),
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
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            status: operatorData.status,
            type: operatorData.type,
            active: cleanWhereDataBoolean(operatorData.active),
            automaticRenew: cleanWhereDataBoolean(operatorData.automaticRenew),
            order: cleanWhereDataString(operatorData.order),
            app: cleanWhereDataString(operatorData.app),
            startAt: cleanWhereDataIntervalString(operatorData.startAt),
            endAt: cleanWhereDataIntervalString(operatorData.endAt),
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
        status: cleanSortValue(query.orderBy?.status),
        type: cleanSortValue(query.orderBy?.type),
        active: cleanSortValue(query.orderBy?.active),
        automaticRenew: cleanSortValue(query.orderBy?.automaticRenew),
        startAt: cleanSortValue(query.orderBy?.startAt),
        endAt: cleanSortValue(query.orderBy?.endAt),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toPrismaDataRaw(key: string, value: any) {
    if (value?.startsWith) {
      return `${key} LIKE ${value?.startsWith}%`;
    }
    if (value?.endsWith) {
      return `${key} LIKE %${value?.endsWith}`;
    }
    return `${key} = ${value?.equals}`;
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
