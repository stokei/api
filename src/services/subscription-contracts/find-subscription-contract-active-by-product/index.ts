import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindSubscriptionContractActiveByProductDTO } from '@/dtos/subscription-contracts/find-subscription-contract-active-by-product.dto';
import { FindSubscriptionContractActiveByProductQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-active-by-product.query';

@Injectable()
export class FindSubscriptionContractActiveByProductService
  implements
    IBaseService<FindSubscriptionContractActiveByProductDTO, Promise<boolean>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindSubscriptionContractActiveByProductDTO
  ): Promise<boolean> {
    return await this.queryBus.execute(
      new FindSubscriptionContractActiveByProductQuery(data)
    );
  }
}
