import { Args, Query, Resolver } from '@nestjs/graphql';

import { PaymentMethodsLoader } from '@/controllers/graphql/dataloaders/payment-methods.loader';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import {
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodsLoader: PaymentMethodsLoader) {}

  @Query(() => PaymentMethod)
  async paymentMethod(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const paymentMethod = await this.paymentMethodsLoader.findByIds.load(id);
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }
    return paymentMethod;
  }
}
