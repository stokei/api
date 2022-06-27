import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSubscriptionsDTO } from '@/dtos/subscriptions/find-all-subscriptions.dto';
import { SubscriptionModel } from '@/models/subscription.model';
import { FindAllSubscriptionsQuery } from '@/queries/implements/subscriptions/find-all-subscriptions.query';

@Injectable()
export class FindAllSubscriptionsService
  implements
    IBaseService<
      FindAllSubscriptionsDTO,
      Promise<IPaginatedType<SubscriptionModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSubscriptionsDTO
  ): Promise<IPaginatedType<SubscriptionModel>> {
    return await this.queryBus.execute(new FindAllSubscriptionsQuery(data));
  }
}
