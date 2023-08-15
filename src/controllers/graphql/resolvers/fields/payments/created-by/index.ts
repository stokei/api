import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';

@Resolver(() => Payment)
export class PaymentCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() payment: PaymentModel) {
    return (
      payment.createdBy && this.accountsLoader.findByIds.load(payment.createdBy)
    );
  }
}
