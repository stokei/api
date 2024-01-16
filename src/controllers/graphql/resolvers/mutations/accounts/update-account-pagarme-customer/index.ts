import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateAccountPagarmeCustomerInput } from '@/controllers/graphql/inputs/accounts/update-account-pagarme-customer.input';
import { Account } from '@/controllers/graphql/types/account';
import { UpdateAccountPagarmeCustomerService } from '@/services/accounts/update-account-pagarme-customer';

@Resolver(() => Account)
export class UpdateAccountPagarmeCustomerResolver {
  constructor(
    private readonly updateAccountPagarmeCustomerService: UpdateAccountPagarmeCustomerService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Account)
  async updateAccountPagarmeCustomer(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateAccountPagarmeCustomerInput
  ) {
    const response = await this.updateAccountPagarmeCustomerService.execute({
      ...data,
      phone: {
        ...data?.phone,
        parent: currentAccountId,
        app: appId,
        createdBy: currentAccountId
      },
      app: appId,
      account: currentAccountId,
      updatedBy: currentAccountId
    });
    return response;
  }
}
