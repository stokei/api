import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IPaginatedType,
  PaginationMapper
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllSubscriptionContractItemsBySubscriptionQuery } from '@/queries/implements/subscription-contract-items/find-all-subscription-contract-items-by-subscription.query';
import { CountSubscriptionContractItemsBySubscriptionRepository } from '@/repositories/subscription-contract-items/count-subscription-contract-items-by-subscription';
import { FindAllSubscriptionContractItemsBySubscriptionRepository } from '@/repositories/subscription-contract-items/find-all-subscription-contract-items-by-subscription';

@QueryHandler(FindAllSubscriptionContractItemsBySubscriptionQuery)
export class FindAllSubscriptionContractItemsBySubscriptionQueryHandler
  implements IQueryHandler<FindAllSubscriptionContractItemsBySubscriptionQuery>
{
  constructor(
    private readonly findAllSubscriptionContractItemsBySubscriptionRepository: FindAllSubscriptionContractItemsBySubscriptionRepository,
    private readonly countSubscriptionContractItemsBySubscriptionRepository: CountSubscriptionContractItemsBySubscriptionRepository
  ) {}

  async execute(
    query: FindAllSubscriptionContractItemsBySubscriptionQuery
  ): Promise<IPaginatedType<SubscriptionContractItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const subscriptionContractItems =
      await this.findAllSubscriptionContractItemsBySubscriptionRepository.execute(
        data
      );
    const totalCount =
      await this.countSubscriptionContractItemsBySubscriptionRepository.execute(
        data
      );
    return new PaginationMapper<SubscriptionContractItemModel>().toPaginationList(
      {
        items: subscriptionContractItems || [],
        page: data?.page,
        totalCount: totalCount || 0
      }
    );
  }

  private clearData(
    query: FindAllSubscriptionContractItemsBySubscriptionQuery
  ): FindAllSubscriptionContractItemsBySubscriptionQuery {
    return cleanObject({
      where: cleanObject({
        app: cleanWhereDataString(query?.where?.app),
        parent: cleanWhereDataSearch(query?.where?.parent),
        status: query?.where?.status,
        product: cleanWhereDataSearch(query?.where?.product)
      }),
      orderBy: cleanObject({
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      }),
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      })
    });
  }
}
