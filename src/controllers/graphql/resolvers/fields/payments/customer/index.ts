import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';

@Resolver(() => Payment)
export class PaymentCustomerResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  customer(@Parent() payment: PaymentModel) {
    return (
      payment.customer && this.accountsLoader.findByIds.load(payment.customer)
    );
  }
}
