import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionMapper } from '@/mappers/subscriptions';
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

    const data = new SubscriptionMapper().toFindAllQueryClean(query);
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
}
