import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePaymentMethodCardInput } from '@/controllers/graphql/inputs/payment-methods/create-payment-method-card.input';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { CreatePaymentMethodCardByCardHashService } from '@/services/payment-methods/create-payment-method-card-by-card-hash';

@Resolver(() => PaymentMethod)
export class CreatePaymentMethodCardResolver {
  constructor(
    private readonly createPaymentMethodCardByCardHashService: CreatePaymentMethodCardByCardHashService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => PaymentMethod)
  async createPaymentMethodCard(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreatePaymentMethodCardInput
  ) {
    const response =
      await this.createPaymentMethodCardByCardHashService.execute({
        ...data,
        app: appId,
        parent: currentAccountId,
        createdBy: currentAccountId
      });
    return response;
  }
}
