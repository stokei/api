import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AccountModel } from '@/models/account.model';
import { FindAccountByIdRepository } from '@/repositories/accounts/find-account-by-id';
import { FindAccountByIdQuery } from '@/queries/implements/accounts/find-account-by-id.query';

@QueryHandler(FindAccountByIdQuery)
export class FindAccountByIdQueryHandler
  implements IQueryHandler<FindAccountByIdQuery>
{
  constructor(
    private readonly findAccountByIdRepository: FindAccountByIdRepository
  ) {}

  async execute(query: FindAccountByIdQuery): Promise<AccountModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const account = await this.findAccountByIdRepository.execute(id);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
