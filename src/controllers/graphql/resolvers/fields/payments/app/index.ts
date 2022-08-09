import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Payment)
export class PaymentAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Payment)
  app(@Parent() payment: PaymentModel) {
    return this.findAppByIdService.execute(payment.app);
  }
}
