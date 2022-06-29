import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdatePaymentInput } from '@/controllers/graphql/inputs/payments/update-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { UpdatePaymentService } from '@/services/payments/update-payment';

@Resolver(() => Payment)
export class UpdatePaymentResolver {
  constructor(private readonly updatePaymentService: UpdatePaymentService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Payment)
  async updatePayment(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdatePaymentInput
  ) {
    const response = await this.updatePaymentService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
