import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAppPagarmeAccountInput } from '@/controllers/graphql/inputs/apps/create-app-pagarme-account.input';
import { App } from '@/controllers/graphql/types/app';
import { CreateAppPagarmeAccountService } from '@/services/apps/create-app-pagarme-account';

@Resolver(() => App)
export class CreateAppPagarmeAccountResolver {
  constructor(
    private readonly createAppPagarmeAccountService: CreateAppPagarmeAccountService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => App)
  async createAppPagarmeAccount(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateAppPagarmeAccountInput
  ) {
    const response = await this.createAppPagarmeAccountService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
