import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Phone } from '@/controllers/graphql/types/phone';
import { PhoneModel } from '@/models/phone.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Phone)
export class PhoneUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() phone: PhoneModel) {
    return this.findAccountByIdService.execute(phone.updatedBy);
  }
}
