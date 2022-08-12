import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Resolver(() => PaymentMethod)
export class PaymentMethodParentResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  parent(@Parent() order: PaymentMethodModel) {
    return order.parent && this.accountsLoader.findByIds.load(order.parent);
  }
}
