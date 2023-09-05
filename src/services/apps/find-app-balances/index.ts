import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAppBalancesDTO } from '@/dtos/apps/find-app-balances.dto';
import { BalanceModel } from '@/models/balance.model';
import { FindAppBalancesQuery } from '@/queries/implements/apps/find-app-balances.query';

@Injectable()
export class FindAppBalancesService
  implements IBaseService<FindAppBalancesDTO, Promise<BalanceModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAppBalancesDTO): Promise<BalanceModel[]> {
    return await this.queryBus.execute(new FindAppBalancesQuery(data));
  }
}
