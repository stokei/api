import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountNotFoundException } from '@/errors';
import { AccountModel } from '@/models/account.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => MeAccount)
export class MeAccountResolver {
  constructor(
    private readonly accountsLoader: AccountsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Query(() => MeAccount)
  async me(@CurrentAccount('id') currentAccountId: string) {
    if (!currentAccountId) {
      throw new UnauthorizedException();
    }

    const account = await this.getOrSetCacheService.execute<AccountModel>(
      currentAccountId,
      () => this.accountsLoader.findByIds.load(currentAccountId),
      5000 // 5 seconds
    );
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
