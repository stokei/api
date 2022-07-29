import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SubscriptionContractMapper } from '@/mappers/subscription-contracts';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractsQuery } from '@/queries/implements/subscription-contracts/find-all-subscription-contracts.query';
import { CountSubscriptionContractsRepository } from '@/repositories/subscription-contracts/count-subscription-contracts';
import { FindAllSubscriptionContractsRepository } from '@/repositories/subscription-contracts/find-all-subscription-contracts';

@QueryHandler(FindAllSubscriptionContractsQuery)
export class FindAllSubscriptionContractsQueryHandler
  implements IQueryHandler<FindAllSubscriptionContractsQuery>
{
  constructor(
    private readonly findAllSubscriptionContractRepository: FindAllSubscriptionContractsRepository,
    private readonly countSubscriptionContractsRepository: CountSubscriptionContractsRepository
  ) {}

  async execute(
    query: FindAllSubscriptionContractsQuery
  ): Promise<IPaginatedType<SubscriptionContractModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new SubscriptionContractMapper().toFindAllQueryClean(query);
    const subscriptionContracts =
      await this.findAllSubscriptionContractRepository.execute(data);
    const totalCount = await this.countSubscriptionContractsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SubscriptionContractModel>().toPaginationList({
      items: subscriptionContracts,
      page: data.page,
      totalCount
    });
  }
}
