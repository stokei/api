import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePaymentMethodInput } from '@/controllers/graphql/inputs/payment-methods/create-payment-method.input';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { CreatePaymentMethodCardService } from '@/services/payment-methods/create-payment-method-card';

@Resolver(() => PaymentMethod)
export class CreatePaymentMethodResolver {
  constructor(
    private readonly createPaymentMethodCardService: CreatePaymentMethodCardService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => PaymentMethod)
  async createPaymentMethod(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreatePaymentMethodInput
  ) {
    const response = await this.createPaymentMethodCardService.execute({
      ...data,
      app: appId,
      parent: currentAccountId,
      createdBy: currentAccountId
    });
    return response;
  }
}
