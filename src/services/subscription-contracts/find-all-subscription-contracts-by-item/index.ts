import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSubscriptionContractsByItemDTO } from '@/dtos/subscription-contracts/find-all-subscription-contracts-by-item.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractsByItemQuery } from '@/queries/implements/subscription-contracts/find-all-subscription-contracts-by-item.query';

@Injectable()
export class FindAllSubscriptionContractsByItemService
  implements
    IBaseService<
      FindAllSubscriptionContractsByItemDTO,
      Promise<IPaginatedType<SubscriptionContractModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSubscriptionContractsByItemDTO
  ): Promise<IPaginatedType<SubscriptionContractModel>> {
    return await this.queryBus.execute(
      new FindAllSubscriptionContractsByItemQuery(data)
    );
  }
}
