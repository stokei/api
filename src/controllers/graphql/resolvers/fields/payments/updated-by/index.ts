import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Payment)
export class PaymentUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() payment: PaymentModel) {
    return this.findAccountByIdService.execute(payment.updatedBy);
  }
}
