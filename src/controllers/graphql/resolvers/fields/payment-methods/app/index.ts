import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => PaymentMethod)
export class PaymentMethodAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => PaymentMethod)
  app(@Parent() paymentMethod: PaymentMethodModel) {
    return this.findAppByIdService.execute(paymentMethod.app);
  }
}
