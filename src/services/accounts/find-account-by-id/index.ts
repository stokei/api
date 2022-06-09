import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AccountModel } from '@/models/account.model';
import { FindAccountByIdQuery } from '@/queries/implements/accounts/find-account-by-id.query';

@Injectable()
export class FindAccountByIdService
  implements IBaseService<string, Promise<AccountModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<AccountModel> {
    return await this.queryBus.execute(new FindAccountByIdQuery(data));
  }
}
