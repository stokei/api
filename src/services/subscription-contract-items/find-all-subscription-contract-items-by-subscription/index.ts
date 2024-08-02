import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSubscriptionContractItemsBySubscriptionDTO } from '@/dtos/subscription-contract-items/find-all-subscription-contract-items-by-subscription.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllSubscriptionContractItemsBySubscriptionQuery } from '@/queries/implements/subscription-contract-items/find-all-subscription-contract-items-by-subscription.query';

@Injectable()
export class FindAllSubscriptionContractItemsBySubscriptionService
  implements
    IBaseService<
      FindAllSubscriptionContractItemsBySubscriptionDTO,
      Promise<IPaginatedType<SubscriptionContractItemModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSubscriptionContractItemsBySubscriptionDTO
  ): Promise<IPaginatedType<SubscriptionContractItemModel>> {
    return await this.queryBus.execute(
      new FindAllSubscriptionContractItemsBySubscriptionQuery(data)
    );
  }
}
