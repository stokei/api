import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateAccountInput } from '@/controllers/graphql/inputs/accounts/update-account.input';
import { Account } from '@/controllers/graphql/types/account';
import { UpdateAccountService } from '@/services/accounts/update-account';

@Resolver(() => Account)
export class UpdateAccountResolver {
  constructor(private readonly updateAccountService: UpdateAccountService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Account)
  async updateAccount(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateAccountInput
  ) {
    const response = await this.updateAccountService.execute({
      where: {
        account: data?.where?.account || currentAccountId,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
