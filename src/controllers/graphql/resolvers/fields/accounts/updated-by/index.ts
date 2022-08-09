import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { AccountModel } from '@/models/account.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Account)
export class AccountUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() account: AccountModel) {
    return this.findAccountByIdService.execute(account.updatedBy);
  }
}
