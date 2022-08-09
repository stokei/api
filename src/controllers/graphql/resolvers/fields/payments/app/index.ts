import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Payment)
export class PaymentAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() payment: PaymentModel) {
    return this.findAppByIdService.execute(payment.app);
  }
}
