import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreatePaymentInput } from '@/controllers/graphql/inputs/payments/create-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { CreatePaymentService } from '@/services/payments/create-payment';

@Resolver(() => Payment)
export class CreatePaymentResolver {
  constructor(private readonly createPaymentService: CreatePaymentService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Payment)
  async createPayment(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreatePaymentInput
  ) {
    const response = await this.createPaymentService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
