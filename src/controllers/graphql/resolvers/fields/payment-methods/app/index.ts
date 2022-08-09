import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Resolver(() => PaymentMethod)
export class PaymentMethodAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() paymentMethod: PaymentMethodModel) {
    return (
      paymentMethod.app && this.appsLoader.findByIds.load(paymentMethod.app)
    );
  }
}
