import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { Account } from '@/controllers/graphql/types/account';
import { AccountNotFoundException, ParamNotFoundException } from '@/errors';
import { FindAccountByEmailAndAppService } from '@/services/accounts/find-account-by-email-and-app';

@Resolver(() => Account)
export class AccountByEmailResolver {
  constructor(
    private readonly findAccountByEmailAndAppService: FindAccountByEmailAndAppService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => Account)
  async accountByEmail(
    @Args('email', { nullable: true }) email: string,
    @CurrentApp('id') appId: string
  ) {
    if (!email) {
      throw new ParamNotFoundException('email');
    }

    const account = await this.findAccountByEmailAndAppService.execute({
      email,
      app: appId
    });
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account;
  }
}
