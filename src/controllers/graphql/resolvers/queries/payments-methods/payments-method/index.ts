import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaymentsMethodsLoader } from '@/controllers/graphql/dataloaders/payments-methods.loader';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';
import {
  PaymentsMethodNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => PaymentsMethod)
export class PaymentsMethodResolver {
  constructor(private readonly paymentsMethodsLoader: PaymentsMethodsLoader) {}

  @Query(() => PaymentsMethod)
  async paymentsMethod(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const paymentsMethod = await this.paymentsMethodsLoader.findByIds.load(id);
    if (!paymentsMethod) {
      throw new PaymentsMethodNotFoundException();
    }
    return paymentsMethod;
  }
}
