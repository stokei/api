import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Price)
export class PriceUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() price: PriceModel) {
    return this.findAccountByIdService.execute(price.updatedBy);
  }
}
