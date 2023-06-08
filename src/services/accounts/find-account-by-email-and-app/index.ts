import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindAccountByEmailAndAppDTO } from '@/dtos/accounts/find-account-by-email-and-app.dto';
import { AccountModel } from '@/models/account.model';
import { FindAccountByEmailAndAppQuery } from '@/queries/implements/accounts/find-account-by-email-and-app.query';

@Injectable()
export class FindAccountByEmailAndAppService
  implements IBaseService<FindAccountByEmailAndAppDTO, Promise<AccountModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAccountByEmailAndAppDTO): Promise<AccountModel> {
    return await this.queryBus.execute(new FindAccountByEmailAndAppQuery(data));
  }
}
