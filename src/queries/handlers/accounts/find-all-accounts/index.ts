import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';
import { FindAllAccountsQuery } from '@/queries/implements/accounts/find-all-accounts.query';
import { CountAccountsRepository } from '@/repositories/accounts/count-accounts';
import { FindAllAccountsRepository } from '@/repositories/accounts/find-all-accounts';

@QueryHandler(FindAllAccountsQuery)
export class FindAllAccountsQueryHandler
  implements IQueryHandler<FindAllAccountsQuery>
{
  constructor(
    private readonly findAllAccountRepository: FindAllAccountsRepository,
    private readonly countAccountsRepository: CountAccountsRepository
  ) {}

  async execute(
    query: FindAllAccountsQuery
  ): Promise<IPaginatedType<AccountModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new AccountMapper().toFindAllQueryClean(query);
    const accounts = await this.findAllAccountRepository.execute(data);
    const totalCount = await this.countAccountsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AccountModel>().toPaginationList({
      items: accounts,
      page: data.page,
      totalCount
    });
  }
}
