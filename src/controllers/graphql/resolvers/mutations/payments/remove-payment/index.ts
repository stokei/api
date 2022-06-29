import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemovePaymentInput } from '@/controllers/graphql/inputs/payments/remove-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { RemovePaymentService } from '@/services/payments/remove-payment';

@Resolver(() => Payment)
export class RemovePaymentResolver {
  constructor(private readonly removePaymentService: RemovePaymentService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Payment)
  async removePayment(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemovePaymentInput
  ) {
    const response = await this.removePaymentService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
