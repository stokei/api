import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaymentsLoader } from '@/controllers/graphql/dataloaders/payments.loader';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentsLoader: PaymentsLoader) {}

  @Query(() => Payment)
  async payment(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const payment = await this.paymentsLoader.findByIds.load(id);
    if (!payment) {
      throw new PaymentNotFoundException();
    }
    return payment;
  }
}
