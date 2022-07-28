import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemovePaymentMethodInput } from '@/controllers/graphql/inputs/payment-methods/remove-payment-method.input';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { RemovePaymentMethodService } from '@/services/payment-methods/remove-payment-method';

@Resolver(() => PaymentMethod)
export class RemovePaymentMethodResolver {
  constructor(
    private readonly removePaymentMethodService: RemovePaymentMethodService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => PaymentMethod)
  async removePaymentMethod(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemovePaymentMethodInput
  ) {
    const response = await this.removePaymentMethodService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
