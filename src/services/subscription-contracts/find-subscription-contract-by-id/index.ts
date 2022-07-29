import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractByIdQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-by-id.query';

@Injectable()
export class FindSubscriptionContractByIdService
  implements IBaseService<string, Promise<SubscriptionContractModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SubscriptionContractModel> {
    return await this.queryBus.execute(
      new FindSubscriptionContractByIdQuery(data)
    );
  }
}
