import { Args, Query, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { AccountNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @Query(() => Account)
  async account(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const account = await this.accountsLoader.findByIds.load(id);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
