import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAccountPagarmeCustomerInput } from '@/controllers/graphql/inputs/accounts/create-account-pagarme-customer.input';
import { Account } from '@/controllers/graphql/types/account';
import { CreateAccountPagarmeCustomerService } from '@/services/accounts/create-account-pagarme-customer';

@Resolver(() => Account)
export class CreateAccountPagarmeCustomerResolver {
  constructor(
    private readonly createAccountPagarmeCustomerService: CreateAccountPagarmeCustomerService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Account)
  async createAccountPagarmeCustomer(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateAccountPagarmeCustomerInput
  ) {
    const response = await this.createAccountPagarmeCustomerService.execute({
      ...data,
      phone: {
        ...data?.phone,
        parent: currentAccountId,
        app: appId,
        createdBy: currentAccountId
      },
      app: appId,
      account: currentAccountId,
      createdBy: currentAccountId
    });
    return response;
  }
}
