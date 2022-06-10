import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemovePaymentInput } from '@/controllers/graphql/inputs/payments/remove-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { RemovePaymentService } from '@/services/payments/remove-payment';

@Resolver(() => Payment)
export class RemovePaymentResolver {
  constructor(private readonly removePaymentService: RemovePaymentService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Payment)
  async removePayment(@Args('input') data: RemovePaymentInput) {
    const response = await this.removePaymentService.execute(data);
    return response;
  }
}
