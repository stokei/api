import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  SubscriptionContractNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractByIdQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-by-id.query';
import { FindSubscriptionContractByIdRepository } from '@/repositories/subscription-contracts/find-subscription-contract-by-id';

@QueryHandler(FindSubscriptionContractByIdQuery)
export class FindSubscriptionContractByIdQueryHandler
  implements IQueryHandler<FindSubscriptionContractByIdQuery>
{
  constructor(
    private readonly findSubscriptionContractByIdRepository: FindSubscriptionContractByIdRepository
  ) {}

  async execute(
    query: FindSubscriptionContractByIdQuery
  ): Promise<SubscriptionContractModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const subscriptionContract =
      await this.findSubscriptionContractByIdRepository.execute(id);
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    return subscriptionContract;
  }
}
