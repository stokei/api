import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Currency } from '@/controllers/graphql/types/currency';
import { CurrencyModel } from '@/models/currency.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Currency)
export class CurrencyUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() currency: CurrencyModel) {
    return this.findAccountByIdService.execute(currency.updatedBy);
  }
}
