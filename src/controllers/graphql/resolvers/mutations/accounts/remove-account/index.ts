import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { Account } from '@/controllers/graphql/types/account';
import { RemoveAccountService } from '@/services/accounts/remove-account';

@Resolver(() => Account)
export class RemoveAccountResolver {
  constructor(private readonly removeAccountService: RemoveAccountService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Account)
  async removeAccount(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.removeAccountService.execute({
      where: {
        app: appId,
        account: currentAccountId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
