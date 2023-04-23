import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindSubscriptionContractItemByIdQuery } from '@/queries/implements/subscription-contract-items/find-subscription-contract-item-by-id.query';

@Injectable()
export class FindSubscriptionContractItemByIdService
  implements IBaseService<string, Promise<SubscriptionContractItemModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SubscriptionContractItemModel> {
    return await this.queryBus.execute(
      new FindSubscriptionContractItemByIdQuery(data)
    );
  }
}
