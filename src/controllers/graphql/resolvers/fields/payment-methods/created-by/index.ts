import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Resolver(() => PaymentMethod)
export class PaymentMethodCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() paymentMethod: PaymentMethodModel) {
    return (
      paymentMethod.updatedBy &&
      this.accountsLoader.findByIds.load(paymentMethod.createdBy)
    );
  }
}
