import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IPaginatedType,
  PaginationMapper,
  splitServiceId
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionModel } from '@/models/subscription.model';
import { FindAllSubscriptionsQuery } from '@/queries/implements/subscriptions/find-all-subscriptions.query';
import { CountSubscriptionsRepository } from '@/repositories/subscriptions/count-subscriptions';
import { FindAllSubscriptionsRepository } from '@/repositories/subscriptions/find-all-subscriptions';

@QueryHandler(FindAllSubscriptionsQuery)
export class FindAllSubscriptionsQueryHandler
  implements IQueryHandler<FindAllSubscriptionsQuery>
{
  constructor(
    private readonly findAllSubscriptionRepository: FindAllSubscriptionsRepository,
    private readonly countSubscriptionsRepository: CountSubscriptionsRepository
  ) {}

  async execute(
    query: FindAllSubscriptionsQuery
  ): Promise<IPaginatedType<SubscriptionModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const subscriptions = await this.findAllSubscriptionRepository.execute(
      data
    );
    const totalCount = await this.countSubscriptionsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SubscriptionModel>().toPaginationList({
      items: subscriptions,
      page: data.page,
      totalCount
    });
  }

  private clearData(
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
          name: cleanWhereDataSearch(operatorData.name),
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
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}
