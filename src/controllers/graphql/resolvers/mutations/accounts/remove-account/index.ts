import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { Account } from '@/controllers/graphql/types/account';
import { AccountModel } from '@/models/account.model';
import { RemoveAccountService } from '@/services/accounts/remove-account';

@Resolver(() => Account)
export class RemoveAccountResolver {
  constructor(private readonly removeAccountService: RemoveAccountService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Account)
  async removeAccount(@CurrentAccount() account: AccountModel) {
    const response = await this.removeAccountService.execute({
      where: {
        accountId: account.id
      }
    });
    return response;
  }
}
