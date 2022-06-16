import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountNotFoundException } from '@/errors';
import { AccountModel } from '@/models/account.model';

@Resolver(() => MeAccount)
export class MeAccountResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @UseGuards(AuthenticatedGuard)
  @Query(() => MeAccount)
  async me(@CurrentAccount() currentAccount: AccountModel) {
    if (!currentAccount?.id) {
      throw new UnauthorizedException();
    }
    const account = await this.accountsLoader.findByIds.load(
      currentAccount?.id
    );
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
