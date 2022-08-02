import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountNotFoundException } from '@/errors';

@Resolver(() => MeAccount)
export class MeAccountResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Query(() => MeAccount)
  async me(@CurrentAccount('id') currentAccountId: string) {
    if (!currentAccountId) {
      throw new UnauthorizedException();
    }

    const account = await this.accountsLoader.findByIds.load(currentAccountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
