import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePaymentInput } from '@/controllers/graphql/inputs/payments/create-payment.input';
import { Payment } from '@/controllers/graphql/types/payment';
import { CreatePaymentService } from '@/services/payments/create-payment';

@Resolver(() => Payment)
export class CreatePaymentResolver {
  constructor(private readonly createPaymentService: CreatePaymentService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Payment)
  async createPayment(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreatePaymentInput
  ) {
    const response = await this.createPaymentService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
