import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthenticatedGuard,
  CurrentAccount,
  IAuthenticatedAccount
} from '@stokei/nestjs';

import { Account } from '@/controllers/graphql/types/account';
import { RemoveAccountService } from '@/services/accounts/remove-account';

@Resolver(() => Account)
export class RemoveAccountResolver {
  constructor(private readonly removeAccountService: RemoveAccountService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Account)
  async removeAccount(@CurrentAccount() account: IAuthenticatedAccount) {
    const response = await this.removeAccountService.execute({
      where: {
        accountId: account.id,
        removedBy: account.id
      }
    });
    return response;
  }
}
