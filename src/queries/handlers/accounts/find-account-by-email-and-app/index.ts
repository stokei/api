import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { AccountModel } from '@/models/account.model';
import { FindAccountByEmailAndAppQuery } from '@/queries/implements/accounts/find-account-by-email-and-app.query';
import { FindAccountByEmailAndAppRepository } from '@/repositories/accounts/find-account-by-email-and-app';

@QueryHandler(FindAccountByEmailAndAppQuery)
export class FindAccountByEmailAndAppQueryHandler
  implements IQueryHandler<FindAccountByEmailAndAppQuery>
{
  constructor(
    private readonly findAccountByEmailAndAppRepository: FindAccountByEmailAndAppRepository
  ) {}

  async execute(query: FindAccountByEmailAndAppQuery): Promise<AccountModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const email = cleanValue(query.email);
    if (!email) {
      throw new ParamNotFoundException('email');
    }
    const app = cleanValue(query.app);
    if (!app) {
      throw new ParamNotFoundException('app');
    }
    const account = await this.findAccountByEmailAndAppRepository.execute({
      app,
      email
    });
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
