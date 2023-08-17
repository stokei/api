import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UserHasSubscriptionContractActiveDTO } from '@/dtos/subscription-contracts/user-has-subscription-contract-active.dto';
import { UserHasSubscriptionContractActiveQuery } from '@/queries/implements/subscription-contracts/user-has-subscription-contract-active.query';

@Injectable()
export class UserHasSubscriptionContractActiveService
  implements
    IBaseService<UserHasSubscriptionContractActiveDTO, Promise<boolean>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: UserHasSubscriptionContractActiveDTO): Promise<boolean> {
    return await this.queryBus.execute(
      new UserHasSubscriptionContractActiveQuery(data)
    );
  }
}
