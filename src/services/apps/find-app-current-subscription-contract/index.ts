import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAppCurrentSubscriptionContractQuery } from '@/queries/implements/apps/find-app-current-subscription-contract.query';

@Injectable()
export class FindAppCurrentSubscriptionContractService
  implements IBaseService<string, Promise<SubscriptionContractModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(appId: string): Promise<SubscriptionContractModel> {
    return await this.queryBus.execute(
      new FindAppCurrentSubscriptionContractQuery(appId)
    );
  }
}
