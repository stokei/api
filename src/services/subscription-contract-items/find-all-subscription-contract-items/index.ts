import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSubscriptionContractItemsDTO } from '@/dtos/subscription-contract-items/find-all-subscription-contract-items.dto';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAllSubscriptionContractItemsQuery } from '@/queries/implements/subscription-contract-items/find-all-subscription-contract-items.query';

@Injectable()
export class FindAllSubscriptionContractItemsService
  implements
    IBaseService<
      FindAllSubscriptionContractItemsDTO,
      Promise<IPaginatedType<SubscriptionContractItemModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSubscriptionContractItemsDTO
  ): Promise<IPaginatedType<SubscriptionContractItemModel>> {
    return await this.queryBus.execute(
      new FindAllSubscriptionContractItemsQuery(data)
    );
  }
}
