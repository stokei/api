import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Address } from '@/controllers/graphql/types/address';
import { AddressModel } from '@/models/address.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Address)
export class AddressCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() address: AddressModel) {
    return this.findAccountByIdService.execute(address.createdBy);
  }
}
