import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAccountInput } from '@/controllers/graphql/inputs/accounts/create-account.input';
import { Account } from '@/controllers/graphql/types/account';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { CreateAccountService } from '@/services/accounts/create-account';

@Resolver(() => Account)
export class CreateAccountResolver {
  constructor(private readonly signUpService: CreateAccountService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => AuthResponse)
  async createAccount(
    @Args('input') data: CreateAccountInput,
    @CurrentApp('id') appId: string,
    @CurrentAccount('id') accountId: string
  ) {
    const response = await this.signUpService.execute({
      ...data,
      app: appId,
      createdBy: accountId
    });
    return response;
  }
}
