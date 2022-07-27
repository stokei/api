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

import { SubscriptionEntity } from '@/entities';
import { SubscriptionModel } from '@/models/subscription.model';
import { FindAllSubscriptionsQuery } from '@/queries/implements/subscriptions/find-all-subscriptions.query';

export class SubscriptionMapper {
  toFindAllQueryClean(
    query: FindAllSubscriptionsQuery
  ): FindAllSubscriptionsQuery {
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
          product: cleanWhereDataString(operatorData.product),
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
  toModel(subscription: SubscriptionEntity) {
    return (
      subscription &&
      new SubscriptionModel({
        ...subscription,
        updatedAt: convertToISODateString(subscription.updatedAt),
        createdAt: convertToISODateString(subscription.createdAt)
      })
    );
  }
  toModels(subscriptions: SubscriptionEntity[]) {
    return subscriptions?.length > 0
      ? subscriptions.map(this.toModel).filter(Boolean)
      : [];
  }
}
