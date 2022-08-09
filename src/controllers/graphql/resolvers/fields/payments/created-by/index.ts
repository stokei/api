import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Payment)
export class PaymentCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() payment: PaymentModel) {
    return this.findAccountByIdService.execute(payment.createdBy);
  }
}
