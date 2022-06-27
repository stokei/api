import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  SubscriptionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { SubscriptionModel } from '@/models/subscription.model';
import { FindSubscriptionByIdQuery } from '@/queries/implements/subscriptions/find-subscription-by-id.query';
import { FindSubscriptionByIdRepository } from '@/repositories/subscriptions/find-subscription-by-id';

@QueryHandler(FindSubscriptionByIdQuery)
export class FindSubscriptionByIdQueryHandler
  implements IQueryHandler<FindSubscriptionByIdQuery>
{
  constructor(
    private readonly findSubscriptionByIdRepository: FindSubscriptionByIdRepository
  ) {}

  async execute(query: FindSubscriptionByIdQuery): Promise<SubscriptionModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const subscription = await this.findSubscriptionByIdRepository.execute(id);
    if (!subscription) {
      throw new SubscriptionNotFoundException();
    }
    return subscription;
  }
}
