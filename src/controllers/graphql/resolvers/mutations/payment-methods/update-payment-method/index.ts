import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdatePaymentMethodInput } from '@/controllers/graphql/inputs/payment-methods/update-payment-method.input';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { UpdatePaymentMethodService } from '@/services/payment-methods/update-payment-method';

@Resolver(() => PaymentMethod)
export class UpdatePaymentMethodResolver {
  constructor(
    private readonly updatePaymentMethodService: UpdatePaymentMethodService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => PaymentMethod)
  async updatePaymentMethod(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdatePaymentMethodInput
  ) {
    const response = await this.updatePaymentMethodService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
