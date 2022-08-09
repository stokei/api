import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Price)
export class PriceCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() price: PriceModel) {
    return this.findAccountByIdService.execute(price.createdBy);
  }
}
