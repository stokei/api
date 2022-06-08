import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { AccountModel } from '@/models/account.model';
import { FindAllAccountsDTO } from '@/dtos/accounts/find-all-accounts.dto';
import { FindAllAccountsQuery } from '@/queries/implements/accounts/find-all-accounts.query';

@Injectable()
export class FindAllAccountsService
  implements
    IBaseService<FindAllAccountsDTO, Promise<IPaginatedType<AccountModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllAccountsDTO
  ): Promise<IPaginatedType<AccountModel>> {
    return await this.queryBus.execute(new FindAllAccountsQuery(data));
  }
}
