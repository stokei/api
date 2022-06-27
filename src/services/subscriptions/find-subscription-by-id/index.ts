import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SubscriptionModel } from '@/models/subscription.model';
import { FindSubscriptionByIdQuery } from '@/queries/implements/subscriptions/find-subscription-by-id.query';

@Injectable()
export class FindSubscriptionByIdService
  implements IBaseService<string, Promise<SubscriptionModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SubscriptionModel> {
    return await this.queryBus.execute(new FindSubscriptionByIdQuery(data));
  }
}
