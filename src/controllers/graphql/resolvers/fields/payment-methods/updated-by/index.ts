import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => PaymentMethod)
export class PaymentMethodUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() paymentMethod: PaymentMethodModel) {
    return this.findAccountByIdService.execute(paymentMethod.updatedBy);
  }
}
