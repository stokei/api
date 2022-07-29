import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllSubscriptionContractsDTO } from '@/dtos/subscription-contracts/find-all-subscription-contracts.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractsQuery } from '@/queries/implements/subscription-contracts/find-all-subscription-contracts.query';

@Injectable()
export class FindAllSubscriptionContractsService
  implements
    IBaseService<
      FindAllSubscriptionContractsDTO,
      Promise<IPaginatedType<SubscriptionContractModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllSubscriptionContractsDTO
  ): Promise<IPaginatedType<SubscriptionContractModel>> {
    return await this.queryBus.execute(
      new FindAllSubscriptionContractsQuery(data)
    );
  }
}
