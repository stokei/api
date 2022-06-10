import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveAccountInput } from '@/controllers/graphql/inputs/accounts/remove-account.input';
import { Account } from '@/controllers/graphql/types/account';
import { RemoveAccountService } from '@/services/accounts/remove-account';

@Resolver(() => Account)
export class RemoveAccountResolver {
  constructor(private readonly removeAccountService: RemoveAccountService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Account)
  async removeAccount(@Args('input') data: RemoveAccountInput) {
    const response = await this.removeAccountService.execute(data);
    return response;
  }
}
