import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Address } from '@/controllers/graphql/types/address';
import { AddressModel } from '@/models/address.model';

@Resolver(() => Address)
export class AddressCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() address: AddressModel) {
    return (
      address.createdBy && this.accountsLoader.findByIds.load(address.createdBy)
    );
  }
}
